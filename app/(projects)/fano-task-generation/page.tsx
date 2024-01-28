'use client'
import fanoFunction from '@/lib/fano-generation'
import { motion } from 'framer-motion';
import { useState } from 'react';
export default function Page() {

    const [dataObj, setDataObj] = useState(fanoFunction())
    const [input, setInput] = useState('')
    const [isExploding, setIsExploding] = useState(false);
    const [isAnswering, setIsAnswering] = useState(true)
    return (
        <motion.div className="border py-5 px-5 my-2 rounded-md " initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} suppressHydrationWarning>
            <p className='mb-10' suppressHydrationWarning>

                Для кодирования некоторой последовательности, состоящей из букв {dataObj.letterArray.sort().map((letter, i) => {
                    return (
                        <>
                            {i !== 0 && ', '}
                            <span className='font-semibold'>{letter}</span>
                        </>
                    )
                })} решили использовать неравномерный двоичный код, удовлетворяющий условию Фано. Для буквы {dataObj.showedLetters[0]} использовали кодовое слово {dataObj.data[dataObj.showedLetters[0]]}, для буквы {dataObj.showedLetters[1]} — кодовое слово {dataObj.data[dataObj.showedLetters[1]]}. Какова наименьшая возможная суммарная длина всех четырёх кодовых слов?

                Примечание.

                Условие Фано означает, что никакое кодовое слово не является началом другого кодового слова. Это обеспечивает возможность однозначной расшифровки закодированных сообщений. ответ: {dataObj.summ}
                {/* {JSON.stringify(dataObj.data)} */}
            </p>

            {isAnswering ? (
                <div className='flex gap-2 max-sm:flex-col'>
                    <input placeholder='ваш ответ' type="number" className='px-2 flex-1 max-w-[400px] max-sm:max-w-full py-2  text-sm rounded-md font-semibold border focus:outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' onChange={(e) => { setInput(e.target.value) }} />
                    <button onClick={() => setIsAnswering(false)} className="px-8 py-2  bg-black text-white text-sm rounded-md font-semibold hover:bg-black/[0.8] hover:shadow-lg transition">
                        Проверить
                    </button>
                </div>
            ) : (
                parseInt(input) === dataObj.summ ? (
                    <div className="flex gap-10">
                        Ответ верный
                        <button onClick={() => {
                            setDataObj(fanoFunction())
                            setIsAnswering(true)
                        }}>дальше</button>
                    </div>
                ) : (
                    <div className="flex gap-10">
                        Ответ неверный
                        <button onClick={() => {
                            setDataObj(fanoFunction())
                            setIsAnswering(true)
                        }}>дальше</button>
                    </div>
                )
            )}
        </motion.div>
    )
}
