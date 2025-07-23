import Container from '@/components/Container'
import Header from '@/components/Header'
import Logo from '@/components/Logo'
import { NavLink } from 'react-router-dom'
const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <div className='flex items-center justify-between gap-4 py-10'>
          <div className='flex-1'>
            <img src='/bg.jpg' />
          </div>
          <div className='basis-[500px]'>
            <div className='text-5xl leading-[1.67] text-gray-800 dark:text-gray-200'>
              <span className='bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-7xl font-bold text-transparent'>
                Cải thiện hiệu suất
              </span>{' '}
              <p className='inline'>làm việc của bạn với chúng tôi</p>
              <Logo className={'ml-2'} />
            </div>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>
              Chúng tôi cung cấp các công cụ quản lý dự án và công việc hiệu
              quả, giúp bạn tập trung vào những gì quan trọng nhất.
            </p>
            <NavLink
              to={'/manager/workspace'}
              className='mt-5 inline-block rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 text-2xl text-white hover:opacity-85 hover:shadow-2xl'
            >
              Không gian học tập
            </NavLink>
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomePage
