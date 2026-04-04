"use client"

export default function Error({ error }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>í´¥ ERROR</h1>
      <pre>{error?.message}</pre>
      <pre>{error?.stack}</pre>
    </div>
  )
}
