import { FormInput } from '../FormInput'
import { FormTextarea } from '../FormTextarea'
import { FormButton } from '../FormButton'

/**
 * Innermost layer — actually renders inputs. “Grandchild” in the tree below App.
 */
function FormLeaf({
  form,
  onFieldChange,
  totalInteractions,
  onPrimaryAction,
}) {
  return (
    <div className="lesson-nest lesson-nest--deep">
      <p className="lesson-role">Grandchild (form fields)</p>
      <p className="lesson-caption">
        Receives <code>form</code> and <code>onFieldChange</code> through two
        middle layers — that is prop drilling from the app root.
      </p>
      <form className="demo-form" noValidate onSubmit={(e) => e.preventDefault()}>
        <FormInput
          id="drill-name"
          name="name"
          label="Name"
          value={form.name}
          onChange={onFieldChange}
          placeholder="Jane Doe"
          autoComplete="name"
        />
        <FormInput
          id="drill-email"
          name="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={onFieldChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <FormTextarea
          id="drill-message"
          name="message"
          label="Message"
          value={form.message}
          onChange={onFieldChange}
          placeholder="Say hello…"
        />
        <FormButton type="button" onClick={onPrimaryAction}>
          Touch global counter ({totalInteractions})
        </FormButton>
      </form>
    </div>
  )
}

/** Middle layer — does not use the props itself; only forwards them. */
function FormMiddleLayer(props) {
  return (
    <div className="lesson-nest">
      <p className="lesson-role">Parent (pass-through)</p>
      <p className="lesson-caption">
        Same props forwarded again — still no local state here.
      </p>
      <FormBridgeLayer {...props} />
    </div>
  )
}

/** Another hop — common when layouts wrap content (sidebars, shells, etc.). */
function FormBridgeLayer(props) {
  return (
    <div className="lesson-nest">
      <p className="lesson-role">Bridge (pass-through)</p>
      <FormLeaf {...props} />
    </div>
  )
}

/**
 * First child under the app: receives “global” props from App and starts drilling.
 * App → GlobalFormDrilling → FormMiddleLayer → FormBridgeLayer → FormLeaf
 */
export function GlobalFormDrilling({
  form,
  onFieldChange,
  totalInteractions,
  onPrimaryAction,
}) {
  return (
    <section className="lesson-card" aria-labelledby="lesson-global-drill">
      <h2 id="lesson-global-drill">2. Global state + prop drilling</h2>
      <p className="lesson-lead">
        <strong>Global</strong> here means one owner at the top of the tree (
        <code>App</code>
        ). Every layer below only forwards props until they reach the inputs. No
        Context or Redux — just explicit props.
      </p>
      <div className="lesson-nest lesson-nest--root">
        <p className="lesson-role">App (owns global form + counter)</p>
        <p className="lesson-live">
          Live preview — name:{' '}
          <strong>{form.name || '—'}</strong>, email:{' '}
          <strong>{form.email || '—'}</strong>, message length:{' '}
          <strong>{form.message.length}</strong>, interactions:{' '}
          <strong>{totalInteractions}</strong>
        </p>
        <FormMiddleLayer
          form={form}
          onFieldChange={onFieldChange}
          totalInteractions={totalInteractions}
          onPrimaryAction={onPrimaryAction}
        />
      </div>
    </section>
  )
}
