import React, { createContext, useState, useContext, ReactNode } from "react";


interface Template {
  name: string;
  category: string;
  language: string;
  allow_category_change:boolean
  components:[];
}

// Initial templates array
const initialTemplates: Template[] = [
  {
    "name": "Discounts",
    "language": "en_US",
    "allow_category_change":true,
    "category": "UTILITY",
    "components": [
      {
        "type": "HEADER",
        "format": "IMAGE",
        "example": {
          "header_handle": [
            "4::aW..."
          ]
        }
      },
      {
        "type": "BODY",
        "text": "Hi {{1}}, we would like to inform you that our {{2}} offers will start at {{3}} take the chance to get the best out of all merchandise sales.",
        "example": {
          "header_text": [
            "Ahmad","25%","25th of september"
          ]
        }
      },
      {
        "type": "FOOTER",
        "text": "Use the buttons below to manage your marketing subscriptions"
      },
      {
        "type": "BUTTONS",
        "buttons": [
          {
            "type": "PHONE_NUMBER",
            "text": "Call",
            "phone_number": "15550051310"
          },
        ]
      }
    ]

  },
  {
    "name": "Welcome",
    "language": "en_US",
    "allow_category_change":true,
    "category": "UTILITY",
    "components": [
      {
        "type": "HEADER",
        "format": "TEXT",
        "text": "Welcome {{1}}",
        "example": {
          "header_text": [
            "Mr. Ahmad"
          ]
        }
      },
      {
        "type": "BODY",
        "text": "we are glad you are here. We have a lot of things to show you, hit the link below to get started.",
        "example": {
          "header_text": [
          ]
        }
      },
      {
        "type": "BUTTONS",
        "buttons": [
          {
            "type": "URL",
            "text": "Check website",
            "url": "https://localhost:8080/sales"
          },
        ]
      }
    ]

  },
  {
    "name": "christmas sales",
    "language": "en_US",
    "allow_category_change":true,
    "category": "UTILITY",
    "components": [
      {
        "type": "HEADER",
        "format": "LOCATION"
      },
      {
        "type": "BODY",
        "text": "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",
        "example": {
          "header_text": [
            "the end of August","25OFF","25%"
          ]
        }
      },
      {
        "type": "FOOTER",
        "text": "Use the buttons below to manage your marketing subscriptions"
      },
      {
        "type": "BUTTONS",
        "buttons": [
          {
            "type": "PHONE_NUMBER",
            "text": "Call",
            "phone_number": "15550051310"
          },
        ]
      }
    ]

  },
  {
    "name": "order_confirmation",
    "language": "en_US",
    "allow_category_change":true,
    "category": "UTILITY",
    "components": [
      {
        "type": "BODY",
        "text": "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",
        "example": {
          "header_text": [
            "the end of August","25OFF","25%"
          ]
        }
      },
      {
        "type": "FOOTER",
        "text": "Use the buttons below to manage your marketing subscriptions"
      },
      {
        "type": "BUTTONS",
        "buttons": [
          {
            "type": "QUICK_REPLY",
            "example": "Order Confirmed✅"
          }
        ]
      }
    ]

  }
];


// Define context value type
interface TemplatesContextType {
  templates: Template[];
  updateTemplate: (
    name: string,
    updatedTemplate: Partial<Template>
  ) => void;
  createTemplate:(newTemplate:Partial<Template>)=>void;
  removeTemplate:(name:string)=>void;
}

// Create the context
const TemplatesContext = createContext<TemplatesContextType | undefined>(
  undefined
);

// Provider props type
interface TemplatesProviderProps {
  children: ReactNode;
}

// Provider component
export const TemplatesProvider: React.FC<TemplatesProviderProps> = ({
  children,
}) => {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates);

  // Function to update a template by name
  const updateTemplate = (
    name: string,
    updatedTemplate: Partial<Template>
  ) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.name === name
          ? { ...template, ...updatedTemplate }
          : template
      )
    );
  };

  const createTemplate = (newTemplate: Partial<Template>) => {
    setTemplates((prevTemplates) => {
      // Check if the template already exists
      const templateExists = prevTemplates.some(
        (template) => template.name === newTemplate.name
      );
  
      if (templateExists) {
        // Update the existing template
        return prevTemplates.map((template) =>
          template.name === newTemplate.name
            ? { ...template, ...newTemplate } // Merge the changes
            : template
        );
      } else {
        // Add the new template
        return [...prevTemplates, newTemplate as Template];
      }
    });
  };

  const removeTemplate = (name:string)=>{
    setTemplates((prevTemplates) =>
      prevTemplates.filter((template) => template.name !== name)
    );
  }
  

  return (
    <TemplatesContext.Provider value={{ templates, updateTemplate,createTemplate,removeTemplate }}>
      {children}
    </TemplatesContext.Provider>
  );
};

// Custom hook to use the context
export const useTemplates = (): TemplatesContextType => {
  const context = useContext(TemplatesContext);
  if (!context) {
    throw new Error("useTemplates must be used within a TemplatesProvider");
  }
  return context;
};
