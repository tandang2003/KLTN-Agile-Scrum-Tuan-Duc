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
import { useRef } from 'react'

const Editor = () => {
  const ref = useRef<MDXEditorMethods>(null)

  return (
    <div>
      <MDXEditor
        ref={ref}
        onChange={() => console.log(ref.current?.getMarkdown())}
        markdown={'# Hello World'}
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
      />
    </div>
  )
}

export default Editor
