import { ClassAttributor, Scope } from 'parchment';
import Quill from 'quill';
import Delta from 'quill-delta';
import { CodeToken, CodeBlock } from 'quill/modules/syntax';
import { traverse } from 'quill/modules/clipboard';

const Syntax =  Quill.import('modules/syntax');

const TokenAttributor = new ClassAttributor('code-token', 'hljs', {
  scope: Scope.INLINE,
});

class CodeSyntax extends Syntax {
  // override initListener to avoid creating selection box
  initListener() {}
  
  // overrider highlightBlot to highlight the text automatically
  highlightBlot(text, language = 'plain') {
    const container = this.quill.root.ownerDocument.createElement('div');
    container.classList.add(CodeBlock.className);
    container.innerHTML = this.options.hljs.highlightAuto(text).value;
    return traverse(
      this.quill.scroll,
      container,
      [
        (node, delta) => {
          const value = TokenAttributor.value(node);
          if (value) {
            return delta.compose(
              new Delta().retain(delta.length(), {
                [CodeToken.blotName]: value,
              }),
            );
          }
          return delta;
        },
      ],
      [
        (node, delta) => {
          return node.data.split('\n').reduce((memo, nodeText, i) => {
            if (i !== 0) memo.insert('\n', { [CodeBlock.blotName]: language });
            return memo.insert(nodeText);
          }, delta);
        },
      ],
      new WeakMap(),
    );
  }
}


export default CodeSyntax;
