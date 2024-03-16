'use client'
import fanoFunction, { Return } from '@/lib/fano-generation'
import { HeaderColorContext } from '@/components/context';
import { useContext, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { GrPowerReset } from "react-icons/gr";


type CounterType = {
    all: number,
    right: number
}

export default function Page() {
    const [dataObj, setDataObj] = useState(fanoFunction())
    const [input, setInput] = useState('')
    const [isAnswering, setIsAnswering] = useState(true)
    const [rightCouter, setRightCounter] = useState<CounterType>({ all: 0, right: 0 })
    const [isResetClicked, setIsResetClicked] = useState(false)
    useEffect(() => {
        const all = parseInt(window.localStorage.getItem('all') || '0', 10);
        const right = parseInt(window.localStorage.getItem('right') || '0', 10);
        setRightCounter({ all, right });
    }, []);

    useEffect(() => {
        if (rightCouter.all !== 0) {
            window.localStorage.setItem('all', String(rightCouter.all));
            window.localStorage.setItem('right', String(rightCouter.right));
        }
    }, [rightCouter])
    console.log(dataObj.summ)
    return (
        <div className="border py-5 px-5 my-2 rounded-md relative" suppressHydrationWarning>
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

                Условие Фано означает, что никакое кодовое слово не является началом другого кодового слова. Это обеспечивает возможность однозначной расшифровки закодированных сообщений.
            </p>

            {isAnswering ? (
                <div className='flex gap-2 max-sm:flex-col'>
                    <input placeholder='ваш ответ' type="number" className='px-2 flex-1 max-w-[400px] max-sm:max-w-full py-2  text-sm rounded-md font-semibold border focus:outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' onChange={(e) => { setInput(e.target.value) }} />
                    <AnimatedBtn func={() => {
                        setIsAnswering(false)
                    }} text='проверить' />
                </div>
            ) : (
                <ResultScreen rightCouter={rightCouter} setRightCounter={setRightCounter} setDataObj={setDataObj} setIsAnswering={setIsAnswering} isRight={parseInt(input) === dataObj.summ} />
            )}
            <AnimatePresence>

                    {isResetClicked ? (
                        <motion.button variants={counterVariants} initial={'closed'} animate='open' whileHover={`hover`} exit={`closed`} key={`reset`} className={`absolute right-2 bottom-2 transition max-md:top-0 h-fit px-2 py-1 max-md:py-2`} onClick={() => {
                            setIsResetClicked(false)
                            setRightCounter({ all: 1, right: 1 })
                        }}>
                            <GrPowerReset />
                        </motion.button>
                    ) : (
                        <motion.div variants={counterVariants} initial={'closed'} animate='open' whileHover={`hover`} exit={`closed`} key={`counter`} className={`absolute right-2 bottom-1 cursor-pointer tracking-widest ${rightCouter.all === 0 ? 'opacity-0' : 'opacity-100'}  max-md:top-0 px-2 py-1`} onClick={() => {
                            setIsResetClicked(true)
                            setTimeout(() => setIsResetClicked(false), 2500)
                        }}>{rightCouter.right}/{rightCouter.all}</motion.div>
                    )}
            </AnimatePresence>
        </div>
    )
}

const counterVariants: Variants = {
    closed: {
        scale: 0.5,
        opacity: 0.5,
        transition: {
            duration: 0.1,
        }
    },
    open: {
        scale: 1,
        opacity: 100,
        transition: {
            duration: 0.1,
        }
    },
    hover: {
        scaleX: 1.1
    }
}


type ResultScreenProps = {
    setDataObj: Dispatch<SetStateAction<Return>>,
    setIsAnswering: Dispatch<SetStateAction<boolean>>,
    isRight: boolean,
    rightCouter: CounterType,
    setRightCounter: Dispatch<SetStateAction<CounterType>>
}

function ResultScreen({ setDataObj, setIsAnswering, isRight, rightCouter, setRightCounter }: ResultScreenProps) {
    const colorContext = useContext(HeaderColorContext)
    colorContext?.setHeaderColor(isRight ? colors.right : colors.false)
    return (
        <div className="flex gap-2 max-sm:flex-col">
            <div className='px-2 flex-1 max-w-[400px] max-sm:max-w-full py-2  text-sm rounded-md font-semibold bg-secondary'>Ответ {isRight ? 'верный' : 'неверный'}</div>
            <AnimatedBtn func={() => {
                setDataObj(fanoFunction())
                setIsAnswering(true)
                colorContext?.setHeaderColor(colors.defalt)
                setRightCounter({ all: rightCouter.all + 1, right: rightCouter.right + (isRight ? 1 : 0) })
            }} text='дальше' />
        </div>
    )
}

function AnimatedBtn({ func, text }: { func: () => void, text: string }) {
    const tailwindInCommon = 'group-hover/btn:opacity-100 group-hover/btn:scale-100 scale-50 group-hover/btn:translate-x-0 -translate-x-1 group-hover/btn:w-fit w-0 opacity-0 transition  '
    return (
        <button onClick={func} className='px-8 py-2 min-w-48 min-h-10 bg-black text-white rounded-md font-semibold group/btn flex justify-center items-center'>
            {
                text === 'проверить' ? (
                    <span><FaMagnifyingGlass className={`${tailwindInCommon} text-sm`} /></span>
                ) : (
                    <span><MdOutlineNavigateNext className={`${tailwindInCommon} text-xl`} /></span>
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