import React from 'react'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'

const ProductCard = ({ project }) => {
  if (!project) return null

  const {
    title = 'Untitled Project',
    description = '',
    image,
    technologies = [],
    metrics,
    demoUrl,
    githubUrl,
    category = 'General',
  } = project

  const handleClick = () => {
    if (demoUrl) window.open(demoUrl, '_blank')
  }

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden "
    >
      <div className="relative h-60 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-black/40 flex items-center justify-center text-white/40">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition duration-500" />

        <div className="absolute top-4 left-4 px-3 py-1 text-xs bg-black/50 backdrop-blur-sm border border-white/80 rounded-full text-white">
          {category}
        </div>

        <div className="absolute bottom-4 right-4 flex gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/50 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/50 hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 hover:scale-110"
              onClick={e => e.stopPropagation()}
            >
              <Github className="w-4 h-4 text-white" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl text-white mb-2 group-hover:text-primary/80 transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs bg-primary/10 text-primary border border-primary/20 rounded-lg "
            >
              {tech}
            </span>
          ))}
        </div>

        {metrics && (
          <div className="flex items-center gap-2 text-green-400 text-sm pt-2 border-t border-white/10">
            <TrendingUp className="w-4 h-4" />
            {metrics}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
