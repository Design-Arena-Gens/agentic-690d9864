'use client'

import { useState } from 'react'

interface Step {
  phase: string
  title: string
  description: string
  tasks: string[]
  bestPractices: string[]
  tools: string[]
}

const migrationSteps: Step[] = [
  {
    phase: "Phase 1",
    title: "Assessment & Planning",
    description: "Evaluate your current infrastructure and plan your AWS migration strategy",
    tasks: [
      "Conduct application portfolio discovery",
      "Identify dependencies and data flows",
      "Assess current resource utilization (CPU, memory, storage, network)",
      "Determine migration strategy (Rehost, Replatform, Refactor, Repurchase, Retire, Retain)",
      "Create detailed migration plan with timelines",
      "Define success criteria and KPIs",
      "Establish AWS account structure and landing zone",
      "Calculate TCO (Total Cost of Ownership) for AWS",
      "Identify compliance and regulatory requirements",
      "Create risk assessment and mitigation plan"
    ],
    bestPractices: [
      "Use AWS Application Discovery Service to automate discovery",
      "Start with non-critical applications for proof of concept",
      "Involve stakeholders from all departments",
      "Document all current configurations and architectures",
      "Plan for minimal downtime during migration"
    ],
    tools: [
      "AWS Application Discovery Service",
      "AWS Migration Hub",
      "AWS Migration Evaluator (formerly TSO Logic)",
      "AWS Well-Architected Tool"
    ]
  },
  {
    phase: "Phase 2",
    title: "Foundation Setup",
    description: "Establish your AWS environment with proper security and governance",
    tasks: [
      "Set up AWS Organizations with multi-account structure",
      "Configure AWS Control Tower for landing zone",
      "Implement AWS IAM policies and roles",
      "Set up AWS SSO (Single Sign-On)",
      "Configure VPC architecture with proper subnets",
      "Establish network connectivity (Direct Connect, VPN)",
      "Set up AWS Config for compliance monitoring",
      "Configure AWS CloudTrail for auditing",
      "Implement AWS GuardDuty for threat detection",
      "Set up centralized logging with CloudWatch",
      "Configure AWS Backup for disaster recovery",
      "Establish tagging strategy for resource management"
    ],
    bestPractices: [
      "Follow AWS Well-Architected Framework principles",
      "Implement least privilege access from day one",
      "Use Infrastructure as Code (CloudFormation/Terraform)",
      "Enable MFA for all privileged accounts",
      "Set up billing alerts and cost monitoring",
      "Document your network architecture thoroughly"
    ],
    tools: [
      "AWS Control Tower",
      "AWS Organizations",
      "AWS CloudFormation",
      "Terraform",
      "AWS Systems Manager",
      "AWS Config"
    ]
  },
  {
    phase: "Phase 3",
    title: "Pilot Migration",
    description: "Execute a small-scale migration to validate your approach",
    tasks: [
      "Select pilot applications (low-complexity, non-critical)",
      "Set up target AWS infrastructure for pilot",
      "Configure AWS Database Migration Service (DMS) if needed",
      "Use AWS Server Migration Service (SMS) or Application Migration Service",
      "Migrate data using AWS DataSync or Snow family devices",
      "Test application functionality in AWS",
      "Validate performance and connectivity",
      "Conduct security testing and vulnerability assessment",
      "Document lessons learned and update migration runbooks",
      "Get stakeholder approval before full migration"
    ],
    bestPractices: [
      "Choose applications with minimal dependencies first",
      "Perform multiple test migrations before cutover",
      "Maintain rollback capability throughout pilot",
      "Monitor application performance closely",
      "Document all configuration changes and issues"
    ],
    tools: [
      "AWS Application Migration Service (MGN)",
      "AWS Database Migration Service (DMS)",
      "AWS DataSync",
      "AWS Snow Family",
      "CloudEndure Migration"
    ]
  },
  {
    phase: "Phase 4",
    title: "Data Migration",
    description: "Migrate databases and storage to AWS with minimal downtime",
    tasks: [
      "Create snapshot backups of all data sources",
      "Set up target databases (RDS, Aurora, DynamoDB)",
      "Configure AWS DMS replication instances",
      "Establish initial data sync with DMS",
      "Set up continuous replication for minimal downtime",
      "Migrate file storage to S3, EFS, or FSx",
      "Validate data integrity and completeness",
      "Test database performance and optimize",
      "Update connection strings in applications",
      "Plan cutover window for final synchronization"
    ],
    bestPractices: [
      "Always maintain data backups during migration",
      "Use DMS continuous replication to minimize downtime",
      "Validate data checksums after migration",
      "Test database failover scenarios",
      "Consider using AWS Schema Conversion Tool for heterogeneous migrations",
      "Plan for data validation and reconciliation"
    ],
    tools: [
      "AWS Database Migration Service",
      "AWS Schema Conversion Tool",
      "AWS DataSync",
      "AWS Transfer Family",
      "AWS Snow Family (for large datasets)"
    ]
  },
  {
    phase: "Phase 5",
    title: "Application Migration",
    description: "Move applications to AWS with your chosen migration strategy",
    tasks: [
      "Prepare EC2 instances or container infrastructure (ECS/EKS)",
      "Configure Auto Scaling groups and load balancers",
      "Set up application deployment pipelines",
      "Migrate application code and configurations",
      "Update DNS records (Route 53)",
      "Configure security groups and network ACLs",
      "Set up CloudWatch monitoring and alarms",
      "Implement AWS WAF for web application protection",
      "Configure CDN with CloudFront if needed",
      "Test application functionality end-to-end",
      "Perform load testing and performance validation",
      "Execute cutover during maintenance window"
    ],
    bestPractices: [
      "Use blue-green deployment for critical applications",
      "Implement health checks and automated rollback",
      "Test disaster recovery procedures",
      "Gradually shift traffic using weighted routing",
      "Keep old infrastructure running temporarily for fallback"
    ],
    tools: [
      "AWS Application Migration Service",
      "AWS Elastic Beanstalk",
      "Amazon ECS/EKS",
      "AWS CodeDeploy",
      "Elastic Load Balancing",
      "Amazon Route 53"
    ]
  },
  {
    phase: "Phase 6",
    title: "Optimization & Modernization",
    description: "Optimize your AWS infrastructure for cost and performance",
    tasks: [
      "Right-size EC2 instances based on actual usage",
      "Implement Reserved Instances or Savings Plans",
      "Set up AWS Compute Optimizer recommendations",
      "Configure S3 lifecycle policies for cost optimization",
      "Implement auto-scaling policies",
      "Optimize database performance and indexing",
      "Set up caching with ElastiCache or CloudFront",
      "Migrate to managed services where appropriate",
      "Implement serverless architectures (Lambda) where beneficial",
      "Configure cost allocation tags and budgets",
      "Set up AWS Trusted Advisor checks",
      "Review and optimize network data transfer costs"
    ],
    bestPractices: [
      "Continuously monitor costs with AWS Cost Explorer",
      "Use AWS Compute Optimizer for resource recommendations",
      "Implement tagging strategy for cost allocation",
      "Consider containerization for improved resource utilization",
      "Evaluate serverless options for event-driven workloads",
      "Schedule non-production resources to stop when not needed"
    ],
    tools: [
      "AWS Cost Explorer",
      "AWS Compute Optimizer",
      "AWS Trusted Advisor",
      "AWS Budgets",
      "AWS Cost Anomaly Detection",
      "AWS Savings Plans"
    ]
  },
  {
    phase: "Phase 7",
    title: "Decommission & Validation",
    description: "Decommission legacy infrastructure and validate migration success",
    tasks: [
      "Validate all applications running successfully in AWS",
      "Confirm all data migrated and validated",
      "Monitor AWS infrastructure for 30+ days",
      "Address any performance or stability issues",
      "Train operations team on AWS tools and services",
      "Update documentation with AWS architecture",
      "Create runbooks for common operational tasks",
      "Establish backup and disaster recovery procedures",
      "Decommission old infrastructure after validation period",
      "Cancel legacy contracts and licenses",
      "Conduct post-migration review and retrospective",
      "Document total cost savings and benefits achieved"
    ],
    bestPractices: [
      "Keep legacy systems available for at least 30 days",
      "Maintain comprehensive backup before decommissioning",
      "Create detailed operational documentation",
      "Ensure team is trained on AWS best practices",
      "Establish ongoing optimization processes",
      "Set up regular architecture reviews"
    ],
    tools: [
      "AWS Systems Manager",
      "AWS CloudWatch",
      "AWS Config",
      "AWS Trusted Advisor",
      "AWS Cost and Usage Reports"
    ]
  }
]

export default function Home() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index)
  }

  const toggleComplete = (index: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedSteps(newCompleted)
  }

  const progress = (completedSteps.size / migrationSteps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-[#232f3e] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <svg className="w-10 h-10 text-[#ff9900]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.75 11.35a4.32 4.32 0 0 0-.79-.08 3.9 3.9 0 0 0-.73.06 4.07 4.07 0 0 0-1.92-2.46 4.16 4.16 0 0 0-3.08-.48A4.12 4.12 0 0 0 9 10.75a4.11 4.11 0 0 0-3.54-.81 4.15 4.15 0 0 0-2.47 1.92 4.12 4.12 0 0 0 .81 5 4.13 4.13 0 0 0 .92.67c-.03.25-.04.5-.04.76a6.14 6.14 0 0 0 6.14 6.14 6.14 6.14 0 0 0 6.14-6.14c0-.26-.02-.51-.05-.76.35-.18.67-.4.96-.67a4.11 4.11 0 0 0 1.29-4.35 4.13 4.13 0 0 0-.41-1.16zM10.82 22.5a5.15 5.15 0 0 1-5.15-5.15c0-.23.02-.45.05-.67l.1-.63-.55-.3a3.13 3.13 0 0 1-.7-.5 3.14 3.14 0 0 1-.62-3.8 3.17 3.17 0 0 1 1.88-1.46 3.15 3.15 0 0 1 2.7.62l.52.4.32-.6a3.14 3.14 0 0 1 2.47-1.67 3.17 3.17 0 0 1 2.35.37 3.1 3.1 0 0 1 1.47 1.88l.14.53.55-.02c.15-.01.3-.01.44 0 .15.01.3.03.43.06a3.14 3.14 0 0 1 1.92 4.76 3.17 3.17 0 0 1-.73.7l-.55.3.1.63c.03.22.05.44.05.67a5.15 5.15 0 0 1-5.15 5.15z"/>
            </svg>
            <div>
              <h1 className="text-3xl font-bold">AWS Migration Guide</h1>
              <p className="text-gray-300 text-sm mt-1">Complete step-by-step migration framework</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-slate-800 rounded-lg p-6 shadow-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Migration Progress</span>
            <span className="text-[#ff9900] font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#ff9900] to-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-2">
            {completedSteps.size} of {migrationSteps.length} phases completed
          </p>
        </div>
      </div>

      {/* Migration Steps */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="space-y-4">
          {migrationSteps.map((step, index) => (
            <div
              key={index}
              className={`bg-slate-800 rounded-lg shadow-xl border-2 transition-all duration-300 ${
                completedSteps.has(index)
                  ? 'border-green-500'
                  : expandedPhase === index
                  ? 'border-[#ff9900]'
                  : 'border-slate-700'
              }`}
            >
              {/* Phase Header */}
              <div
                className="p-6 cursor-pointer hover:bg-slate-750 transition-colors"
                onClick={() => togglePhase(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleComplete(index)
                      }}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        completedSteps.has(index)
                          ? 'bg-green-500 border-green-500'
                          : 'border-slate-600 hover:border-[#ff9900]'
                      }`}
                    >
                      {completedSteps.has(index) && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#ff9900] font-bold text-sm">{step.phase}</span>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                      expandedPhase === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPhase === index && (
                <div className="border-t border-slate-700 p-6 space-y-6 animate-fadeIn">
                  {/* Tasks */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-[#ff9900]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Tasks
                    </h4>
                    <ul className="space-y-2">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start text-gray-300">
                          <span className="text-[#ff9900] mr-3 mt-1">▹</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best Practices */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Best Practices
                    </h4>
                    <ul className="space-y-2">
                      {step.bestPractices.map((practice, practiceIndex) => (
                        <li key={practiceIndex} className="flex items-start text-gray-300">
                          <span className="text-green-500 mr-3 mt-1">✓</span>
                          <span>{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      AWS Tools & Services
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool, toolIndex) => (
                        <span
                          key={toolIndex}
                          className="px-4 py-2 bg-slate-700 text-gray-300 rounded-full text-sm border border-slate-600 hover:border-blue-500 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-slate-800 rounded-lg p-8 shadow-xl border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <svg className="w-7 h-7 mr-3 text-[#ff9900]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://aws.amazon.com/cloud-migration/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors border border-slate-600 hover:border-[#ff9900]"
            >
              <h3 className="text-white font-semibold mb-2">AWS Migration Hub</h3>
              <p className="text-gray-400 text-sm">Official AWS migration resources and documentation</p>
            </a>
            <a
              href="https://docs.aws.amazon.com/prescriptive-guidance/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors border border-slate-600 hover:border-[#ff9900]"
            >
              <h3 className="text-white font-semibold mb-2">AWS Prescriptive Guidance</h3>
              <p className="text-gray-400 text-sm">Detailed migration strategies and patterns</p>
            </a>
            <a
              href="https://aws.amazon.com/architecture/well-architected/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors border border-slate-600 hover:border-[#ff9900]"
            >
              <h3 className="text-white font-semibold mb-2">Well-Architected Framework</h3>
              <p className="text-gray-400 text-sm">Best practices for cloud architecture design</p>
            </a>
            <a
              href="https://aws.amazon.com/training/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors border border-slate-600 hover:border-[#ff9900]"
            >
              <h3 className="text-white font-semibold mb-2">AWS Training & Certification</h3>
              <p className="text-gray-400 text-sm">Free training courses for migration skills</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
