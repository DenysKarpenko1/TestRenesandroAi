import { useReducer, useState } from "react";
import Image from "next/image";
import { FormTask, Layer } from "@/types/task";
import FormField from "./FormField";
import { Button } from "@nextui-org/react";

interface TaskFormProps {
  onSave: (formState: FormTask) => Promise<void>;
  initialData?: FormTask;
}

const initialState: FormTask = {
  name: "",
  templateId: "",
  text: "",
  amount: "",
  genType: "",
  images: 1,
  dimension: "",
  flow: "",
  layers: [
    {
      image: "",
      dimension: "",
      flow: "",
      style: "",
      prompts: "",
      generates: "",
      visible: false,
    },
  ],
};

type Action =
  | {
      type: "UPDATE_FIELD";
      field: keyof FormTask;
      value: string | number;
    }
  | { type: "UPDATE_LAYER"; index: number; field: keyof Layer; value: string }
  | { type: "TOGGLE_LAYER_VISIBILITY"; index: number }
  | { type: "SET_NUM_IMAGES"; images: number };

const formReducer = (state: FormTask, action: Action): FormTask => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "UPDATE_LAYER":
      const updatedLayers = [...state.layers];
      updatedLayers[action.index] = {
        ...updatedLayers[action.index],
        [action.field]: action.value,
      };
      return { ...state, layers: updatedLayers };

    case "TOGGLE_LAYER_VISIBILITY":
      return {
        ...state,
        layers: state.layers.map((layer, i) =>
          i === action.index ? { ...layer, visible: !layer.visible } : layer
        ),
      };

    case "SET_NUM_IMAGES":
      return {
        ...state,
        images: action.images,
        layers: Array.from({ length: action.images }, (_, i) => ({
          image: "",
          dimension: state.dimension,
          flow: state.flow,
          style: "",
          prompts: "",
          generates: "",
          visible: false,
        })),
      };

    default:
      return state;
  }
};

export default function TaskForm({ initialData, onSave }: TaskFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatch] = useReducer(
    formReducer,
    initialData || initialState
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onSave(formState);
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a Task</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField label="Task name:">
          <input
            type="text"
            placeholder="Task name"
            value={formState.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </FormField>

        <FormField label="Template ID:">
          <select
            value={formState.templateId}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "templateId",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Template ID</option>
            <option value="template1">mwpswxcudtwb</option>
            <option value="template2">0xdoscyowl50c</option>
          </select>
        </FormField>

        <FormField label="Text:">
          <input
            type="text"
            placeholder="Text"
            value={formState.text}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "text",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </FormField>

        <FormField label="Amount:">
          <input
            type="number"
            placeholder="Amount"
            value={formState.amount}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "amount",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </FormField>

        <FormField label="Gen Type:">
          <select
            value={formState.genType}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "genType",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Gen Type</option>
            <option value="type1">cyclic_generation</option>
            <option value="type2">random_generation</option>
          </select>
        </FormField>

        <FormField label="Dimension:">
          <select
            value={formState.dimension}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "dimension",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Dimension</option>
            <option value="1x1">1x1</option>
            <option value="9x16">9x16</option>
            <option value="16x9">16x9</option>
          </select>
        </FormField>

        <FormField label="Flow:">
          <select
            value={formState.flow}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "flow",
                value: e.target.value,
              })
            }
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select Flow</option>
            <option value="left">An ultra-realistic photography</option>
            <option value="right">Anime style</option>
          </select>
        </FormField>

        <FormField label="Number of Images:">
          <select
            value={formState.images}
            onChange={(e) =>
              dispatch({ type: "SET_NUM_IMAGES", images: +e.target.value })
            }
            className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </FormField>

        {formState.layers.map((layer, index) => (
          <div key={index} className="border p-4 rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Image {index + 1}</h2>
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "TOGGLE_LAYER_VISIBILITY", index })
                }
                className="flex items-center space-x-2"
              >
                <Image src="/arrow.svg" alt="Arrow" width={24} height={24} />
              </button>
            </div>

            {layer.visible && (
              <div className="mt-4 space-y-4">
                <FormField label="Image URL:">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={layer.image}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LAYER",
                        index,
                        field: "image",
                        value: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </FormField>

                <FormField label="Style:">
                  <input
                    type="text"
                    placeholder="Style"
                    value={layer.style}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LAYER",
                        index,
                        field: "style",
                        value: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </FormField>

                <FormField label="Prompts:">
                  <textarea
                    placeholder="Prompts"
                    value={layer.prompts}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LAYER",
                        index,
                        field: "prompts",
                        value: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    rows={3}
                  />
                </FormField>

                <FormField label="Generates:">
                  <input
                    type="text"
                    placeholder="Generates"
                    value={layer.generates}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_LAYER",
                        index,
                        field: "generates",
                        value: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </FormField>
              </div>
            )}
          </div>
        ))}

        <Button
          isLoading={isLoading}
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
        >
          Generate
        </Button>
      </form>
    </div>
  );
}
