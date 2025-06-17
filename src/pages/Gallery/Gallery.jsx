import React, { useState, useMemo, useEffect } from 'react';

// 1. Import the necessary libraries and their CSS
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// (Optional but recommended) Import plugins for captions
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import axiosInstance from '../../hooks/axiosInstance';

// 2. PASTE YOUR COLLECTED IMAGE DATA ARRAY HERE
// This is the data you provided earlier. Replace it with your full list.



export default function GalleryPage() {
    const [allFoodData, setAllFoodData] = useState([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(-1);

    useEffect(() => {
        axiosInstance.get('/top-food')
            .then(res => {
                setLoading(false);
                console.log(res)
                setAllFoodData(res.data)
            })
    }, [])
    // 3. Transform your data into the format the libraries need.
    // `useMemo` prevents this expensive operation from running on every render.
    const photos = useMemo(() => allFoodData.map(food => ({
        key: food._id,
        src: food.foodImage[0], // Use the first image from the array
        width: 800,  // IMPORTANT: Assign a default width
        height: 600, // IMPORTANT: Assign a default height
        title: food.foodName // Use foodName for the lightbox caption
    })), [allFoodData]);

    if(loading){
        return <span className="loading loading-bars loading-xl"></span>
    }


    return (
        <div style={{ padding: "2rem 4rem" }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>Our Food Gallery</h1>
                <p style={{ fontSize: "1.1rem", color: "#555" }}>
                    A collection of our finest dishes. Click any image to see it larger.
                </p>
            </div>

            {/* 4. The Photo Album component */}
            <RowsPhotoAlbum
                photos={photos}
                targetRowHeight={250}
                onClick={({ index: current }) => setIndex(current)}
            />

            {/* 5. The Lightbox component */}
            <Lightbox
                index={index}
                slides={photos}
                open={index >= 0}
                close={() => setIndex(-1)}
                // Enable plugins
                plugins={[Captions]}
            />
        </div>
    );
}