export const Contributors = (props) => {
  return (
    <div id='contributors'>
      <div className='container'>
        <div className='section-title text-center'>
          <h2>Contributors</h2>
        </div>
        <div className='row'>
          {props.data
          ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-4'>
                  <div className='contributor'>
                    <div className='contributor-image'>
                      {' '}
                      <img src={d.img} alt='' />{' '}
                    </div>
                    <div className='contributor-content'>
                      <p>{d.text}</p>
                      <div className='contributor-meta'> - {d.name} </div>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </div>
  )
}
