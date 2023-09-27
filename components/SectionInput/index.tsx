import React from 'react'
import styles from "./style.module.css"
const SectionInput = () => {
  return (
    <article id='blur' className={`absolute bottom-[10px] left-[160px] right-[20px] rounded-[0_0_0px_20px] xl:py-[20px] xl:px-[180px] `}>
        <div className='bg-[#202020] w-[100%] xl:h-[80px] rounded-[10px] overflow-hidden px-[20px] py-[15px]'>
            <input type="text" name="" id="" className='bg-[transparent] outline-0 caret-[#fff] text-[#fff]' />
        </div>
    </article>
  )
}

export default SectionInput