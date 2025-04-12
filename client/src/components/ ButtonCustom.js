function ButtonCustom(props) {
    let classNames = "border-2 border-border-color rounded-full px-4 py-2 font-bold text-sm";
    
    if (props.outline) {
        classNames += " bg-transparent text-gray-300";
    } else {
        classNames += " bg-white text-black";
    }

    return (
        <button {...props} className={classNames + " " + props.className}>
            {props.children}
        </button>
    );
}


export default ButtonCustom;