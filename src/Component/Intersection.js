import React, {Component} from 'react'
//import ReactDOM from 'react-dom'


class Intersection extends Component{
    constructor(){
        super();
        this.state = {
            imageUrl1 : [],
            imageUrl2 : []
        }
    }
    ref = React.createRef();

    onVisible = () =>{

        fetch("https://api.giphy.com/v1/gifs/random?api_key=afbs0gTjlIUyimEkjgPpJsj5nfqj3he3")
        .then(response => response.json())
        .then(content =>{
            //console.log(content.data.images.original.url)
            const image1 = [...this.state.imageUrl1,content.data.images.original.url]
            this.setState({
                imageUrl1 : image1
            })
        })

        fetch("https://api.giphy.com/v1/gifs/random?api_key=afbs0gTjlIUyimEkjgPpJsj5nfqj3he3")
        .then(response => response.json())
        .then(content =>{
            //console.log(content.data.images.original.url)
            const image2 = [...this.state.imageUrl2,content.data.images.original.url]
            this.setState({
                imageUrl2 : image2
            })
        })

        
    }

    componentDidMount(){
        this.onVisible()
        const observer = new IntersectionObserver(([entry]) =>{
            if (entry.isIntersecting){
                this.onVisible()
            }
        },{
            root : null,
            rootMargin : "0px",
            threshold : 0.5
        })

        if (this.ref.current){
            //console.log("intersecting")
            observer.observe(this.ref.current)
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
                                return <div key={index}>
                                    <img src = { url } alt = "Please Wait" />
                                    <img src = { this.state.imageUrl2[index] } alt = "Please wait"/>
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