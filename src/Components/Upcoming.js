import React, { useState } from 'react'
import { useGlobalContext } from '../Context/global'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Siderbar } from './Siderbar'

const Upcoming= ({rendered}) => {
    const {upcomingAnime, isSearch ,searchResults,} = useGlobalContext()


    const conditionalRender = () => {
        if (!isSearch && rendered==="upcoming") {
            return upcomingAnime.map((anime) => (
                <Link to={`anime/${anime.mal_id}`} key={anime.mal_id} data-title={anime.title_english ? anime.title_english : anime.title}>
                    <img src={anime.images.jpg.large_image_url} alt="" />
                </Link>
            ))
        } else {
          
            return (
                <>
                  {searchResults.filter(anime => anime.rating && anime.rating!=='Rx - Hentai').map((anime) => (
                      <Link to={`anime/${anime.mal_id}`} key={anime.mal_id} data-title={anime.title_english ? anime.title_english : anime.title}>
                        <img src={anime.images.jpg.large_image_url} alt="" /> {/* Adjust the property name accordingly */}
                      </Link>
                    ))}
                </>
              );
        }
    }

    return (
        <PopularStyled>
            <div className="upcoming-anime">{conditionalRender()}</div>
            <Siderbar/>
        </PopularStyled>
    )
}

const PopularStyled = styled.div`
    display: flex;
    .upcoming-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;

        a {
            position: relative;
            height: 500px;
            border-radius: 10px;
            border: 5px solid #e5e7eb;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
                transition: transform 0.2s ease;
            }

            &::after {
                content: attr(data-title);
                width:150px;
                position: absolute;
                top: 70px; /* Adjust top position */
                left:80px; /* Adjust left position */
                padding: 0.5rem;
                transform: translate(-50%, -50%);
       
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                border-radius: 5px;
                opacity: 0;
                transition: opacity 0.2s ease;
                pointer-events: none;
            }

            &:hover::after {
                opacity: 1;
            }

            &:hover img {
                transform: scale(1.05);
            }
        }
    }
`;

export default Upcoming
