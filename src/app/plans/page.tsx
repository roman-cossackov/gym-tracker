type Props = {};

const Plans = (props: Props) => {
    /* Здесь отображается план. Можно его поменять вручную нажав на кнопку Change Plan. 
    Можно формировать его автоматически, добавляя по одному дню каждую тренировку*/
    return (
        <>
            <div>This is plans page</div>
            <div>Block1</div>
            <div>Week 1</div>
            <div>Day 1</div>
            <div>Присед 5 по 5</div>
            <div>Жим 3 по 10</div>
            <button>Change Plan</button>
        </>
    );
};

export default Plans;
