import { cn } from '@/lib/utils'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  linkPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  UndoRedo
} from '@mdxeditor/editor'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

type EditorProps = { classNameContainer?: string } & React.ComponentProps<
  typeof MDXEditor
>

const Editor = ({ classNameContainer, ref, ...props }: EditorProps) => {
  return (
    <div className={cn('overflow-y-auto', classNameContainer)}>
      <MDXEditor
        ref={ref}
        contentEditableClassName='prose'
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          linkPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
              </>
            )
          })
        ]}
        {...props}
      />
    </div>
  )
}

export default Editor
