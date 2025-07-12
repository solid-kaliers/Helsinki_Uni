
const Filter = ({data, changeHandler}) => {
    return(
        <>
            filter on contact: <input value={data} onChange={changeHandler}/>
        </>
    )
}



export default Filter