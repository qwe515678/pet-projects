'use client'
import fanoFunction, { Return } from '@/lib/fano-generation'
import { HeaderColorContext } from '@/components/context';
import { useContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Page() {
    const colorContext = useContext(HeaderColorContext)
    const [dataObj, setDataObj] = useState(fanoFunction())
    const [input, setInput] = useState('')
    const [isAnswering, setIsAnswering] = useState(true)
    return (
        <div className="border py-5 px-5 my-2 rounded-md " suppressHydrationWarning>
            <p className='mb-10' suppressHydrationWarning>

                Для кодирования некоторой последовательности, состоящей из букв {dataObj.letterArray.sort().map((letter, i) => {
                    return (
                        <span key={i}>
                            {i !== 0 && ', '}
                            <span className='font-semibold'>{letter}</span>
                        </span>
                    )
                })} решили использовать неравномерный двоичный код, удовлетворяющий условию Фано. Для буквы {dataObj.showedLetters[0]} использовали кодовое слово {dataObj.data[dataObj.showedLetters[0]]}, для буквы {dataObj.showedLetters[1]} — кодовое слово {dataObj.data[dataObj.showedLetters[1]]}. Какова наименьшая возможная суммарная длина всех четырёх кодовых слов?

                Примечание.

                Условие Фано означает, что никакое кодовое слово не является началом другого кодового слова. Это обеспечивает возможность однозначной расшифровки закодированных сообщений. ответ: {dataObj.summ}
            </p>

            {isAnswering ? (
                <div className='flex gap-2 max-sm:flex-col'>
                    <input placeholder='ваш ответ' type="number" className='px-2 flex-1 max-w-[400px] max-sm:max-w-full py-2  text-sm rounded-md font-semibold border focus:outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' onChange={(e) => { setInput(e.target.value) }} />
                    <AnimatedBtn func={() => {
                        setIsAnswering(false)
                    }} text='проверить' />
                </div>
            ) : (
                <ResultScreen setDataObj={setDataObj} setIsAnswering={setIsAnswering} isRight={parseInt(input) === dataObj.summ} />
            )}
        </div>
    )
}



function ResultScreen({ setDataObj, setIsAnswering, isRight }: { setDataObj: Dispatch<SetStateAction<Return>>, setIsAnswering: Dispatch<SetStateAction<boolean>>, isRight: boolean }) {
    const colorContext = useContext(HeaderColorContext)

    colorContext?.setHeaderColor(isRight ? colors.right : colors.false)
    return (
        <div className="flex gap-2 max-sm:flex-col">
            <div className='px-2 flex-1 max-w-[400px] max-sm:max-w-full py-2  text-sm rounded-md font-semibold bg-secondary'>Ответ неверный</div>
            <AnimatedBtn func={() => {
                setDataObj(fanoFunction())
                setIsAnswering(true)
                colorContext?.setHeaderColor(colors.defalt)
            }} text='дальше' />
        </div>
    )
}

function AnimatedBtn({ func, text }: { func: () => void, text: string }) {
    return (
        <button onClick={func} className='px-8 py-2 min-w-48 min-h-10 bg-black text-white text-sm rounded-md font-semibold group/btn flex justify-center items-center'>
            {
                text === 'проверить' ? (
                    <span><FaMagnifyingGlass className='group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:w-fit w-0 opacity-0 transition delay-75 text-sm' /></span>
                ) : (
                    <span><MdOutlineNavigateNext className='group-hover/btn:opacity-100 group-hover/btn:scale-100 group-hover/btn:w-fit w-0 opacity-0 transition delay-75 text-xl' /></span>
                )
            }
            <span className='group-hover/btn:translate-x-2 transition'>{text}</span>
        </button>
    )
}

const colors = {
    right: 'linear-gradient(90deg, rgba(190,242,100,1) 0%, rgba(134,239,172,1) 100%)',
    false: 'linear-gradient(90deg, rgba(249,168,212,1) 0%, rgba(253,164,175,1) 100%)',
    defalt: 'linear-gradient(90deg, rgba(125,211,252,1) 0%, rgba(147,197,253,1) 100%)',
}