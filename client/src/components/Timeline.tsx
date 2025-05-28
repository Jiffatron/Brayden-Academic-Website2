"use client"

import { Briefcase, GraduationCap, Award, Building2 } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/use-media-query"

type TimelineEvent = {
  date: string
  title: string
  organization: string
  description: string
  icon?: "work" | "education" | "award" | "company"
}

const getIcon = (icon: TimelineEvent["icon"]) => {
  switch (icon) {
    case "education":
      return <GraduationCap className="h-4 w-4" />
    case "award":
      return <Award className="h-4 w-4" />
    case "company":
      return <Building2 className="h-4 w-4" />
    default:
      return <Briefcase className="h-4 w-4" />
  }
}

const TimelineCard = ({
  date,
  title,
  organization,
  description,
  icon = "work",
  index,
  total,
  layout = "horizontal",
}: TimelineEvent & { index: number; total?: number; layout: "horizontal" | "vertical" }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const isLast = index === total! - 1

  return layout === "horizontal" ? (
    <div className="relative flex flex-1 flex-col items-center">
      {!isLast && (
        <div className="absolute left-1/2 top-4 h-0.5 w-full -translate-y-1/2 transform bg-gradient-to-r from-cyan-400/40 to-cyan-400/10" />
      )}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-lg shadow-cyan-400/20 hover:scale-110 transition-transform">
          {getIcon(icon)}
        </div>
        <div className="mb-2 text-xs font-medium text-cyan-300">{date}</div>
        <div className="w-full max-w-[150px] rounded-lg bg-[#1e293b]/60 p-3 text-center shadow-md backdrop-blur-sm hover:bg-[#1e293b]/80 transition-all">
          <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
          <div className="mb-1 text-xs font-medium text-cyan-100">{organization}</div>
          <p className="text-xs text-cyan-100/70">{description}</p>
        </div>
      </motion.div>
    </div>
  ) : (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4 flex gap-3"
    >
      <div className="relative flex flex-col items-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 text-white shadow-lg shadow-cyan-400/20">
          {getIcon(icon)}
        </div>
        <div className="absolute top-7 h-full w-0.5 bg-gradient-to-b from-cyan-400/40 to-cyan-400/10" />
      </div>
      <div className="flex-1 rounded-lg bg-[#1e293b]/60 p-3 shadow-md backdrop-blur-sm">
        <div className="mb-1 text-xs font-medium text-cyan-300">{date}</div>
        <h3 className="mb-1 text-sm font-bold text-white">{title}</h3>
        <div className="mb-1 text-xs font-medium text-cyan-100">{organization}</div>
        <p className="text-xs text-cyan-100/70">{description}</p>
      </div>
    </motion.div>
  )
}

export function ResponsiveTimeline() { 
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const experiences: TimelineEvent[] = [
    {
      date: "2024",
      title: "Finance Intern",
      organization: "MAC of Texas",
      description: "Prepared municipal reports and analyzed bond disclosures.",
      icon: "work",
    },
    {
      date: "2023",
      title: "Equity Research Lead",
      organization: "Texas Tech",
      description: "Completed valuation of Boeing using DCF and comparables.",
      icon: "education",
    },
    {
      date: "2022",
      title: "Amazon Seller",
      organization: "Self-Employed",
      description: "Managed inventory and sales volume across categories.",
      icon: "company",
    },
    {
      date: "2021",
      title: "Grocery Cashier",
      organization: "Tom Thumb",
      description: "Handled transactions and customer service daily.",
      icon: "work",
    },
    {
      date: "2020",
      title: "High School Graduate",
      organization: "Wylie ISD",
      description: "Graduated top 10% of class in Collin County.",
      icon: "education",
    },
  ]

  return (
    <section className="w-full py-10 px-4 md:px-8 bg-[#0f172a] text-white">
      <h2 className="mb-8 text-center text-xl font-semibold text-white">Professional Journey</h2>
      <div className={isDesktop ? "flex min-w-full justify-between" : "flex flex-col"}>
        {experiences.map((exp, index) => (
          <TimelineCard
            key={index}
            {...exp}
            index={index}
            total={experiences.length}
            layout={isDesktop ? "horizontal" : "vertical"}
          />
        ))}
      </div>
    </section>
  )
}
