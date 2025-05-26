import { cn } from '@/lib/utils'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  linkPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
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
import { forwardRef } from 'react'

type EditorProps = { classNameContainer?: string } & React.ComponentProps<
  typeof MDXEditor
>

const Editor = forwardRef<MDXEditorMethods, EditorProps>(
  ({ classNameContainer, ...props }, ref) => {
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
)

export default Editor
