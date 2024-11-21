type BlogTagsProps = {
  tags: string[]
}

export default function BlogTags({ tags }: BlogTagsProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map(tag => (
        <div key={tag} className='rounded-full bg-secondary px-3 py-1'>
          <p className='text-xs font-semibold text-black'>#{tag}</p>
        </div>
      ))}
    </div>
  )
}
