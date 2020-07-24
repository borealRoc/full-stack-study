export default props => {
    return (
        <>
            <h1>I am private route.</h1>
            {
                props.children
            }
        </>
    )
}