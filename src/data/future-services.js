// Future-facing service notes retained outside the public routes and bundles.
export const futureErpServiceArea = {
  id: "erp",
  href: "erp-details",
  icon: "layers",
  title: "ERP Systems",
  description:
    "Bring operational processes and business information together with an ERP system planned around your organization.",
};

export const futureErpServiceDetails = {
  id: "erp-details",
  number: "02",
  kicker: "Connected operations",
  title: "ERP",
  accent: "Systems",
  image: "/assets/services/erp-systems.jpg",
  imageAlt: "Business analytics dashboard on a laptop screen.",
  description:
    "Connect the workflows and information your organization needs to manage in one coordinated system.",
  problem:
    "Separate operational tools can make it harder to keep processes, records and reporting aligned across teams.",
  approach:
    "Understand current workflows and exceptions first, then agree which functional areas and data belong in the initial scope.",
  inquiry: "Discuss ERP requirements",
  need: "ERP Systems",
  estimate: "Scope an ERP project",
  features: [
    {
      icon: "workflow",
      title: "Business process mapping",
      description:
        "Understand current workflows, ownership and exceptions before shaping the system.",
    },
    {
      icon: "layers",
      title: "Functional modules",
      description:
        "Scope areas such as finance, inventory, procurement, human resources or sales around your needs.",
    },
    {
      icon: "database",
      title: "Data and reporting",
      description:
        "Discuss the records, permissions and views teams need to make informed operational decisions.",
    },
  ],
};

export const futureErpSolutionWorkflow = {
  id: "erp",
  label: "ERP",
  kicker: "ERP",
  title: "Enterprise ERP",
  description:
    "Connect business functions across purchase, production and reporting to improve visibility and reduce manual work.",
  ariaLabel: "ERP workflow",
  steps: ["Purchase", "Inventory", "Production", "Sales", "Accounting", "Reports"],
  tags: ["Procurement", "Operations", "Finance", "Analytics"],
};

export const futureErpArticle = {
  icon: "database",
  title: "ERP and operational visibility",
  description:
    "A practical look at bringing ERP workflows and operational reporting into focus.",
};
