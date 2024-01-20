import Header from '@/components/layout/Header'
import Hero from '@/components/layout/Hero'
import HomeMenu from '@/components/layout/HomeMenu'
import SectionHeaders from '@/components/layout/SectionHeaders'


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className='text-center my-16'>
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeading={'About Us'}
        />
        <div className='text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laboriosam ex quibusdam officia tempora fugiat neque. Quidem, illum vel aspernatur repellat voluptate mollitia ipsum suscipit magnam eum officia deserunt soluta?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laboriosam ex quibusdam officia tempora fugiat neque. Quidem, illum vel aspernatur repellat voluptate mollitia ipsum suscipit magnam eum officia deserunt soluta?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum laboriosam ex quibusdam officia tempora fugiat neque. Quidem, illum vel aspernatur repellat voluptate mollitia ipsum suscipit magnam eum officia deserunt soluta?
          </p>
        </div>

      </section>

      <section className='text-center my-8'>
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeading={'Contact Us'} />
        <div className='mt-8'>
          <a className='text-4xl underline text-gray-500' href="tel;+99 093 122 339">+99 093 122 339</a>
        </div>

      </section>
      <footer className='border-t p-8 text-center text-gray-500 mt-16'>
          &copy; 2024 All right reserved
      </footer>
    </>
  )
}
