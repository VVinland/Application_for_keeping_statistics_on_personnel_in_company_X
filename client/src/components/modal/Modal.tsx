import cl from './modal.module.css';

interface IModal {
    visible: boolean;
    setVisible: (value: boolean) => void;
    children?: React.ReactNode
}

const Modal = ({ children, visible, setVisible }: IModal) => {

    const rootClasses = [cl.Modal];
    
    if (visible) {
        rootClasses.push(cl.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.Modal_content} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;