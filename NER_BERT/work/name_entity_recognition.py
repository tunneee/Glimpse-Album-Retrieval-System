import pandas as pd
import numpy as np

from transformers import BertTokenizer, BertConfig
from keras_preprocessing.sequence import pad_sequences
from transformers import BertForTokenClassification, AdamW

import torch
from torch.utils.data import TensorDataset, DataLoader, RandomSampler, SequentialSampler

from datetime import datetime
import parsedatetime

def get_data(new_tokens, new_labels, prompt):
    names = []
    locs = []
    orgs = []
    tims = []

    curr_name = ""
    curr_loc = ""
    curr_org = ""
    curr_tim = ""
    for i in range(len(new_tokens)):
        if new_labels[i] != 'O':
            leb = new_labels[i]
            if leb == "B-per":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_org != "":
                    orgs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_name != "":
                    curr_name += " "
                curr_name += new_tokens[i]


            if leb == "I-per":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_org != "":
                    orgs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_name != "":
                    curr_name += " "
                curr_name += new_tokens[i]

            if leb == "B-geo":
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_org != "":
                    orgs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_loc != "":
                    curr_loc += " "
                curr_loc += new_tokens[i]

            if leb == "I-geo":
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_org != "":
                    orgs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_loc != "":
                    curr_loc += " "
                curr_loc += new_tokens[i]

            if leb == "B-org":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_org != "":
                    curr_org += " "
                curr_org += new_tokens[i]



            if leb == "I-org":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_tim != "":
                    tims.append(curr_tim)
                    curr_tim = ""
                if curr_org != "":
                    curr_org += " "
                curr_org += new_tokens[i]

            if leb == "B-tim":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_org != "":
                    locs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    curr_tim += " "
                curr_tim += new_tokens[i]

            if leb == "I-tim":
                if curr_loc != "":
                    locs.append(curr_loc)
                    curr_loc = ""
                if curr_name != "":
                    names.append(curr_name)
                    curr_name = ""
                if curr_org != "":
                    locs.append(curr_org)
                    curr_org = ""
                if curr_tim != "":
                    curr_tim += " "
                curr_tim += new_tokens[i]

        else:
            if curr_name != "":
                names.append(curr_name)
                curr_name = ""
            if curr_loc != "":
                locs.append(curr_loc)
                curr_loc = ""
            if curr_org != "":
                orgs.append(curr_org)
                curr_org = ""
            if curr_tim != "":
                tims.append(curr_tim)
                curr_tim = ""



    df = pd.DataFrame()
    df["Free flow of Text"] = [prompt]
    df["Extracted Name"] = [names]
    df["Extracted Location"] = [locs]
    df["Extracted Organization"] = [orgs]
    df["Extracted Time"] = [tims]

    # df.to_csv("output1.csv", index=False)

    return df

def time_encoder(time):
    cal = parsedatetime.Calendar()
    time_struct, parse_status = cal.parse("tomorrow")
    ans = datetime(*time_struct[:6])
    return ans

def infor_recognition(model_fine_tuned, tokenizer_bert, prompt):
    tag_values = ['B-org', 'B-per', 'I-tim', 'O', 'I-per', 'I-org', 'I-geo', 'B-tim', 'B-geo', 'PAD']
    tokenized_sentence = tokenizer_bert.encode(prompt)
    input_ids = torch.tensor([tokenized_sentence]).cuda()

    with torch.no_grad():
        output = model_fine_tuned(input_ids)
        label_indices = np.argmax(output[0].to('cpu').numpy(),axis=2)

    tokens = tokenizer_bert.convert_ids_to_tokens(input_ids.to('cpu').numpy()[0])

    new_tokens, new_labels = [], []

    for token, label_idx in zip(tokens, label_indices[0]):
        if token.startswith('##'):
            new_tokens[-1] = new_tokens[-1] + token[2:]
        else:
            new_labels.append(tag_values[label_idx])
            new_tokens.append(token)

    df = get_data(new_tokens, new_labels, prompt)
    
    df["Extracted Time"][0] = [time_encoder(i) for i in df["Extracted Time"][0]]

    return df["Free flow of Text"][0], df["Extracted Name"][0], df["Extracted Location"][0], df["Extracted Organization"][0], df['Extracted Time'][0]