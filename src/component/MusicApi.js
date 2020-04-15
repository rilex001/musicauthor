import React, {Component} from 'react'
class MusicApi extends Component{

    constructor(props){
        super(props)
        this.state = {
            artist: '',
            song: [],
            artistpicture: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            artist: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${this.state.artist}`, {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		    "x-rapidapi-key": "abe082a00dmsh66da68776798b52p11b56ejsn6f4e4cd5c2a0"
	    }
    })
    .then(response => response.json())
    .then(result => {
            this.setState({
            song : result.data,
            artistpicture: result.data[0].artist.picture_medium,
            artist: ''
            })        
    })
    .catch(err => {
	    console.log(err);
    });
    }

    render(){
        const { song } = this.state
        const { artistpicture } = this.state
        const songList = song.length ? (
            song.map(item => {
            return(
                <div className='container' key={item.id}>
                    <p>{item.title_short}</p>
                </div>
             
            )
        })
        ) : (
            <p>Artist dont exist</p>
        )
        return(
            <div>
            <form onSubmit={this.handleSubmit}>
                <input 
                placeholder='Enter artist' 
                onChange={this.handleChange} 
                value={this.state.author}
                type='text'>
                </input>
            </form>
                <div className='container'>
                    <img src={artistpicture} alt=''></img>
                        <div className='songlist'>
                            {songList}
                        </div>
                </div>
            </div>
        )
    }
}

export default MusicApi