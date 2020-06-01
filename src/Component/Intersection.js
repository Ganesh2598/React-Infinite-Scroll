import React, {Component} from 'react'
var randomwords = require("random-words");

//import ReactDOM from 'react-dom'


class Intersection extends Component{
    constructor(){
        super();
        this.state = {
            imageUrl1 : []
        }
        this.observer = "";
    }
    ref = React.createRef();

    onVisible = () =>{

        fetch(`https://api.giphy.com/v1/gifs/search?q=${randomwords()}&api_key=afbs0gTjlIUyimEkjgPpJsj5nfqj3he3&limit=5`)
        .then(response => response.json())
        .then(content =>{
            //console.log(content.data.images.original.url)
            if (!content) {
                this.observer.disconnect();
            }
            const newData = content.data.map(obj => obj.images.original.url)
            const image1 = [...this.state.imageUrl1,...newData]
            this.setState({
                imageUrl1 : image1
            })
        })
    }

    componentDidMount(){
        this.observer = new IntersectionObserver(([entry]) =>{
            //console.log(randomwords())
            if (entry.intersectionRatio>0){
                this.onVisible()
                this.onVisible()
            }
        },{
            root : null,
            rootMargin : "0px",
            threshold : 0.5
        })

        if (this.ref.current){
            //console.log("intersecting")
            this.observer.observe(this.ref.current)
        }
    }

    render(){
        return (
            <>
                <header>
                    INFINITE SCROLL
                </header>
                <main>
                    {
                        this.state.imageUrl1.map(
                            (url,index) =>{
                                return <div key={ index }>
                                    <img src = { url } alt = "Please Wait" />
                                </div>
                            }
                        )
                    }
                </main>
                <footer ref={this.ref}>
                    END OF THE PAGE
                </footer>
            </>
        )
    }

}

export default Intersection;