const Display = ({value, filterName}) => {
  if (filterName === "") {
    return(
    <>
      {value.map((el) => <p key={el.id}>{el.name} {el.number}</p>)}
    </>
  )
  }

  const search = value.filter(el => el.name.toLowerCase().includes(filterName.toLowerCase())) 
  if (search.length === 0) {
    return(
      <>
        <p>No contact found</p>
      </>
    )
  }
  else if (search) {
    return(
      <>
        {search.map((el) => <p key={el.id}>{el.name} {el.number}</p>)}
      </>
    )
  }
}

export default Display