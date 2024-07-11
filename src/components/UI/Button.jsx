export default function Button({children, textOnly, className, ...props}) {

    // const cssClass = textOnly ? `text-button ${className}` : `button ${className}`; or

    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return <button className= {cssClasses} {...props}>{children}</button>
}