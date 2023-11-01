from function_promax import *

def main(curent_offset, number_of_points):
    all_id_url, next_offset = get_all_id_url(curent_offset, collection_name, number_of_points)
    print(f"next_offset: {next_offset}")
    id_urls = get_id_url(all_id_url)
    for id_url in tqdm(id_urls):
        try:
            print(f"Processing Image_ID: {id_url[0]} ")
            detect_faces_embed_update(id_url)
            print(f"Completed processing Image_ID: {id_url[0]} ")
            print('--------------------------------------------------------------------------------')
        except ResourceExhaustedError:
            # Log the error and skip the file
            print(f"Failed to process Image_ID: {id_url[0]} due to ResourceExhaustedError")

    return next_offset

if __name__ == '__main__':
    curent_offset = input("Enter curent_offset: ")
    number_of_points = int(input("Enter number_of_points: "))
    main(curent_offset, number_of_points)