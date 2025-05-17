const Loading = () => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 grid place-items-center bg-white/10'>
      <div className='flex w-full flex-col items-center justify-center gap-4'>
        <div className='flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400 text-4xl text-blue-400'>
          <div className='flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400 text-2xl text-red-400'></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
