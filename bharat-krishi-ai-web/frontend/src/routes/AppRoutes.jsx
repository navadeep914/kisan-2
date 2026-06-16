import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard         from '../pages/Dashboard'
import CropRecommend     from '../pages/CropRecommend'
import PlantDisease      from '../pages/PlantDisease'
import SoilAnalysis      from '../pages/SoilAnalysis'
import CropYield         from '../pages/CropYield'
import MarketPrice       from '../pages/MarketPrice'
import Weather           from '../pages/Weather'
import CropRotation      from '../pages/CropRotation'
import GovSchemes        from '../pages/GovSchemes'
import Chatbot           from '../pages/Chatbot'
import Navbar            from '../components/Navbar'

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Dashboard />} />
        <Route path="/crop"      element={<CropRecommend />} />
        <Route path="/disease"   element={<PlantDisease />} />
        <Route path="/soil"      element={<SoilAnalysis />} />
        <Route path="/yield"     element={<CropYield />} />
        <Route path="/market"    element={<MarketPrice />} />
        <Route path="/weather"   element={<Weather />} />
        <Route path="/rotation"  element={<CropRotation />} />
        <Route path="/schemes"   element={<GovSchemes />} />
        <Route path="/chatbot"   element={<Chatbot />} />
      </Routes>
    </>
  )
}
