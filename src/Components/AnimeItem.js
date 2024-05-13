import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

function AnimeItem() {
    const {id} = useParams()

    //state
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    //destructure anime
    const {
        title, synopsis, 
        trailer,duration,aired, 
        season, images, rank, 
        score,scored_by, popularity, 
        status, rating, source,genres } = anime

    //get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    // get anime characters 

    }


    const getCharacter = async (anime) => {
       const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
        console.log(data.data)
    }

useEffect(()=>{
    getAnime(id)
    getCharacter(id)

},[])
return (
    <>
        <AnimeItemStyled>
        <div className="back">
                <Link to="/">
                    <i className="fas fa-arrow-left"></i>
                    Back to Home
                </Link>
            </div>

            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p>
  <span>Genre</span>
  {genres && genres.map(item => ( <span key={item.id}>{item.name}</span> ))}</p>


                        <p><span>Duration:</span><span>{duration}</span></p>
                        
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less': 'Read More'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ? 
                    <iframe 
                        src={trailer?.embed_url} 
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
    {characters?.map((character, index) => {
        const { role } = character;
        const { images, name, mal_id } = character.character;
        return (
            <Link to={`/character/${mal_id}`} key={index}>
                <div className="character">
                    <img src={images.jpg.image_url} alt="" />
                    <h4>{name}</h4>
                    <p>{role}</p>
                </div>
            </Link>
        );
    })}
</div>

           
   
        </AnimeItemStyled>
    </>
);

  
}
const AnimeItemStyled = styled.div`
    padding: 3rem 19rem;
    background-color: #EDEDED;

    h1 {
        text-align: center;
        color: rgb(28, 67, 155);
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        transition: all .4s ease-in-out;

        &:hover {
            transform: skew(-3deg);
        }
    }

    .title {
        text-align: center;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient(to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description {
        margin-top: 2rem;
        color: rgb(28, 67, 155);
        line-height: 1.7rem;

        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: 600;
        }
    }

    .trailer-con {
        display: flex;
        justify-content: center;
        align-items: center;

        iframe {
            outline: none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #FFFFFF;
            width: 800px;
            height: 450px;
        }
    }

    .details {
        background-color: #fff;
        text-align: center;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;

        .detail {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 1rem;
            
     
            img {
                border-radius: 7px;
                width: 100%;
            }
        }

        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                display: flex;
                gap: 1rem;
          
                width:400px;
            }

            p span:first-child {
                font-weight: 600;
                color: #454e56;
            }
        }
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #e5e7eb;

        .character {
            height: 400px; /* Set a fixed height for each card */
            overflow: hidden; /* Hide overflow content */
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;

            img {
                width: 100%;
                height: 60%; /* Adjust image height as per your design */
                object-fit: cover; /* Ensure images cover the entire space */
            }

            h4 {
                padding: .5rem 0;
                color: #454e56;
                overflow: hidden; /* Hide overflow content */
                white-space: nowrap; /* Prevent text from wrapping */
                text-overflow: ellipsis; /* Show ellipsis for truncated text */
            }

            p {
                color: #27AE60;
                overflow: hidden; /* Hide overflow content */
                white-space: nowrap; /* Prevent text from wrapping */
                text-overflow: ellipsis; /* Show ellipsis for truncated text */
            }

            &:hover {
                transform: translateY(-5px);
            }
        }
    }


    /* Responsive Styles */
    @media screen and (max-width: 1200px) {
        padding: 3rem 10rem;
    }

    @media screen and (max-width: 992px) {
        padding: 3rem 5rem;
    }

    @media screen and (max-width: 768px) {
        padding: 3rem 2rem;

        .details .detail {
            grid-template-columns: repeat(1, 1fr);
        }
    }

    @media screen and (max-width: 576px) {
        padding: 3rem 1rem;

        h1 {
            font-size: 2.5rem;
        }

        .title {
            font-size: 1.5rem;
        }

        .description {
            font-size: 1rem;
        }

        .trailer-con iframe {
            width: 100%;
            height: auto;
        }
    }
`;




export default AnimeItem