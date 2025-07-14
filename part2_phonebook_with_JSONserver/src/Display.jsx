const Display = ({ value = [], filterName, deleteHandler }) => {
  const personsToShow = filterName === ""
    ? value
    : value.filter(el => el.name.toLowerCase().includes(filterName.toLowerCase()));

  if (personsToShow.length === 0) {
    return (
      <div>
        <p>No contact found</p>
      </div>
    );
  }

  return (
    <div>
      {personsToShow.map((el) => (
        <div key={el.id}>
          <p>{el.name} {el.number}</p>
          <button onClick={() => deleteHandler(el.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Display;