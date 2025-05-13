import VerificationFailedPage from '@/pages/verification/invite-project/failed/page'
import VerificationSuccessPage from '@/pages/verification/invite-project/success/page'
import tokenService from '@/services/token.service'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const InviteProjectPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [success, setSuccess] = useState<boolean | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/404')
      return
    }
    const controller = new AbortController()
    tokenService
      .inviteUserToProject(token, {
        signal: controller.signal
      })
      .then(() => {
        setSuccess(true)
      })
      .catch(() => {
        setSuccess(false)
      })

    return () => controller.abort()
  }, [navigate, token])
  return (
    <>
      {success === true && <VerificationSuccessPage />}

      {success === false && <VerificationFailedPage />}
    </>
  )
}

export default InviteProjectPage
