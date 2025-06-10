import Editor from '@/components/Editor'
import HtmlViewer from '@/components/HtmlViewer'
import InlineEdit from '@/components/InlineEdit'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'
import {useContextComment} from "@/components/issue/comment/ContextComment.tsx";
import commentService from "@/services/comment.service.ts";
import {useAppSelector} from "@/context/redux/hook.ts";
import {RootState} from "@/context/redux/store.ts";
import {toast} from "sonner";
import {useEffect} from "react";

const EditorComment = () => {
  const issueId = useAppSelector((state: RootState) => state.issueSlice.current?.id)
  const {isReady, ws} = useContextComment()

  const handlePushComment = (val: string) => {
    if (issueId && isReady) {
      commentService.sendComment(ws, issueId, {
        content: val,
      })
    }
  }

  useEffect(() => {
    if (ws && isReady && ws.connected) {
      const subscriber = ws.subscribe(`/topic/room/${issueId}`, (value) => {
        console.log(value)
        toast.message(JSON.stringify(value.body))
      })
      return () => {
        return subscriber.unsubscribe();
      }
    }
  }, [ws, isReady])

  return (
    <div className='flex gap-2'>
      <div className='basis-[50px]'>
        <Avatar className='mt-2'>
          <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn'/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <InlineEdit<string>
        value={''}
        onSave={handlePushComment}
        className='block flex-1'
        displayComponent={(_) => {
          return (
            <HtmlViewer
              className='rounded-md border px-2 py-3 text-base shadow-md hover:bg-gray-300'
              fallback={'Add a description...'}
            />
          )
        }}
        renderEditor={({value, onChange, onBlur, ref}) => (
          <div className='flex-1'>
            <Editor
              value={value}
              className='w-full'
              classNameContainer='flex-1'
              ref={ref}
              onChange={(_, __, ___, editor) => onChange(editor.getHTML())}
            />
            <div className='mt-3 flex justify-end'>
              <Button type='button' onClick={() => onBlur()}>
                Save
              </Button>
            </div>
          </div>
        )}
      />
    </div>
  )
}
export default EditorComment
