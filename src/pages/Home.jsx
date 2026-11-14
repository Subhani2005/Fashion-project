import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/home/Hero'
import NewSeason from '../components/home/NewSeason'
import CategoryIndex from '../components/home/CategoryIndex'
import Featured from '../components/home/Featured'
import EditorialStory from '../components/home/EditorialStory'
import HorizontalGallery from '../components/home/HorizontalGallery'
import Philosophy from '../components/home/Philosophy'
import NewsletterBlock from '../components/home/NewsletterBlock'
import Marquee from '../components/ui/Marquee'
import { marqueeWords } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle()

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Hero />
      <div className="band">
        <Marquee items={marqueeWords} speed={52} />
      </div>
      <NewSeason />
      <CategoryIndex />
      <Featured />
      <EditorialStory />
      <HorizontalGallery />
      <Philosophy />
      <NewsletterBlock />
    </>
  )
}
