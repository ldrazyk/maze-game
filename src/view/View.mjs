

const Field = function() {
    return (
        <div className='path' id='f_1_1'>Field 1</div>
    );
};

const View = function() {
    let root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Field />);
};

export default View;