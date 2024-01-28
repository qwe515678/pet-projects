type DataItem = {
    symbol: string;
    probability: number;
    code?: string;
    leftNode?: DataItem;
    rightNode?: DataItem;
};
const letters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'R'
]

function shannonFanoAlgorithm(data: DataItem[], priorityLetters: string[]): Record<string, string> {
    // Добавляем экземпляры
    data.push({ symbol: priorityLetters[0], probability: 0.2 });
    data.push({ symbol: priorityLetters[1], probability: 0.2 })

    // Сортировка
    data.sort((a, b) => {
        if (priorityLetters.includes(a.symbol)) return -1;
        if (priorityLetters.includes(b.symbol)) return 1;
        return b.probability - a.probability;
    });

    // Затем создаем дерево Шеннона-Фано
    function createShannonFanoTree(nodes: DataItem[]): DataItem | null {
        if (nodes.length === 1) {
            return nodes[0];
        }

        const leftNodes: DataItem[] = [];
        const rightNodes: DataItem[] = [];
        const middle = Math.floor(nodes.length / 2);

        // Разделите узлы на два подмассива
        for (let i = 0; i < middle; i++) {
            leftNodes.push(nodes[i]);
        }
        for (let i = middle; i < nodes.length; i++) {
            rightNodes.push(nodes[i]);
        }

        // Создайте узлы для левого и правого подмассива
        const leftNode = createShannonFanoTree(leftNodes);
        const rightNode = createShannonFanoTree(rightNodes);

        // Верните новый узел, который объединяет левый и правый узлы
        if (leftNode && rightNode) {
            return {
                symbol: '',
                probability: leftNode.probability + rightNode.probability,
                leftNode,
                rightNode,
            };
        }

        return null;
    }

    // Создайте дерево Шеннона-Фано и верните его
    const tree = createShannonFanoTree(data);

    // Теперь преобразуйте дерево в объект с кодами
    function traverse(node: DataItem | null, code = ''): void {
        if (!node?.leftNode && !node?.rightNode) {
            node!.code = code;
        } else {
            if (node?.leftNode) {
                traverse(node.leftNode, code + '0');
            }
            if (node?.rightNode) {
                traverse(node.rightNode, code + '1');
            }
        }
    }

    traverse(tree);

    // Верните объект с кодами
    const codes: Record<string, string> = {};
    for (let node of data) {
        codes[node.symbol] = node.code!;
    }

    return codes;
}

type Return = {
    data: Record<string, string>;
    summ: number;
    letterArray: string[];
    showedLetters: string[]
}
export default function main(difficulty: number = Math.floor(Math.random() * 4) + 4): Return {
    const letterArray = selectRandomElements(letters, difficulty)
    let probability: { [key: string]: number } = {};
    for (let i = 0; i < letterArray.length; i++) {
        let symbol = letterArray[i]
        if (probability[symbol]) {
            probability[symbol]++;
        } else {
            probability[symbol] = 1;
        }
    }
    const priorityLetters = selectRandomElements(letterArray, 2);
    const values = shannonFanoAlgorithm(Object.entries(probability).map(([symbol, probability]) => ({ symbol, probability })), priorityLetters);
    let sum = 0;

    for (let key in values) {
        let lenght = values[key].length;
        sum += lenght;
    }
    console.log(probability)
    return {
        data: values,
        summ: sum,
        letterArray: letterArray,
        showedLetters: priorityLetters
    }

}
// выбирает рандомные элементы списка
function selectRandomElements<T>(array: T[], amount: number): T[] {
    let copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, amount);
}
