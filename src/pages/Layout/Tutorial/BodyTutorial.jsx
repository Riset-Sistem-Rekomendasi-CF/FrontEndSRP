const BodyTutorial = ({ header, subheader, children }) => {
    return (<section className='max-w-4xl mx-auto text-center py-10'>
        <h1 className='text-5xl font-bold font-poppins py-10 '>{header}</h1>
        <p className='font-medium text-md font-poppins my-4'>{subheader}</p>
        <div>
            {children}
        </div>
    </section>)
}

export default BodyTutorial