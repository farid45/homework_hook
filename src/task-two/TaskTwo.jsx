import React, { useCallback, memo } from 'react';
import RenderCounter from './render-counter/RenderCounter';
import './TaskTwo.css';

export default function TaskTwo() {
    const update = useUpdate();
    return (
        <div className="TaskTwo">
            <button onClick={update}>Обновить компонент</button>
            {/*<RenderCounter />*/}
            <MemoizedRoot />
        </div>
    )
}

const Root = () => {
    const [value, setValue] = React.useState('');
    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);
    
    return (
        <form className="form-container">
            Введенное значение: {value}
            {/*<RenderCounter />*/}
            <MemoizedInput onChange={handleChange} />
        </form>
    )
}

const Input = ({ onChange }) => {
    return (
        <div className="input-container">
            <input type="text" className="input-field" name="value" onChange={onChange} />
            {/*<RenderCounter />*/}
        </div>
    )
}

// Мемоизированние компонентов
const MemoizedRoot = memo(Root);
const MemoizedInput = memo(Input);

function useUpdate() {
    const [, setCount] = React.useState(0);
    return React.useCallback(() => {
        setCount(counter => counter + 1);
    }, []);
}