const WordContainer = ({ word, handleClick }) => {
  return (
    <>
      <ol>
        {word?.map((word, idx) => (
          <li onClick={handleClick} className="mt-4" key={idx}>
            {word}
          </li>
        ))}
      </ol>
    </>
  );
};

export default WordContainer;
