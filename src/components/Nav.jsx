const Nav = ({ notes }) => {
  return (
    <header className="nav-bar">
      <h1 className="title">FireNote</h1>
      {notes.length === 0 ? (
        <p>No Notes Here</p>
      ) : (
        <p>Total Note -{notes.length}</p>
      )}
    </header>
  );
};
export default Nav;
