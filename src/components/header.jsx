import ParticlesBg from "particles-bg";

export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
      <ParticlesBg type="lines" num={5} bg={{zIndex: 0, position:"absolute", top:0}} />
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  // add button click to edit pdf
                  href="/editor"
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Create Signature
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
