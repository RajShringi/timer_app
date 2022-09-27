function Button(props) {
  return (
    <button
      onClick={props.method}
      className="bg-gray-800 rounded-lg py-2 px-6 hover:bg-gray-700"
    >
      {props.name}
    </button>
  );
}

export default Button;
