const Title = ({ pageTitle, subtitle, children }) => {
  return (
    <div className='title'>
      <div className='text'>
        <h1>{pageTitle}</h1>
        {subtitle !== null && <p>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};

export default Title;
