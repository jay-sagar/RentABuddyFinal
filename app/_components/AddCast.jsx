"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "../../app/_utils/GlobalApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ReactSelect from "react-select";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectGroup,
  SelectContent,
  Select,
} from "../../components/ui/select";
import { Textarea } from '../../components/ui/textarea'

const categories = [
  { id: 1, name: "Movie" },
  { id: 2, name: "Food" },
  { id: 3, name: "Travel" },
  { id: 4, name: "Sports" },
  { id: 5, name: "Shopping" },
  { id: 6, name: "Gaming" },
];

function AddCast() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [height, setHeight] = useState("");
  const [premium, setPremium] = useState("");
  const [note,setNote]=useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const handleCostPerHourChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCostPerHour(value);
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setHeight(value);
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = () => {
    const data = {
      data: {
        Name: name,
        CostPerHour: costPerHour,
        // Image: image,
        categories: selectedCategories,
        // Premium: premium,
        // Gender: gender,
        Age: age,
        Height: height,
      },
    };

    GlobalApi.addCast(data).then((resp) => {
      console.log(resp);
      if (resp) {
        toast("You have been added successfully");
        router.push("/success"); // Replace with your success page
      }
    });
  };

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Join Our Casts</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Our Casts And Get the Real Money!</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  className="text-gray-600 dark:text-gray-400 "
                  htmlFor="name"
                >
                  Name
                </Label>
                <Input
                  className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex space-x-2 space-y-2 items-end">
                <div className="w-1/3 space-y-2">
                  <Label
                    className="text-gray-600 dark:text-gray-400 "
                    htmlFor="gender"
                  >
                    Gender
                  </Label>
                  <Select
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
                    id="gender"
                    value={gender}
                    onValueChange={setGender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Your Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/3 space-y-2">
                  <Label
                    className="text-gray-600 dark:text-gray-400 "
                    htmlFor="age"
                  >
                    Age
                  </Label>
                  <Input
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    id="age"
                    placeholder="Enter your Age"
                    value={age}
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="w-1/3 space-y-2">
                  <Label
                    className="text-gray-600 dark:text-gray-400 "
                    htmlFor="height"
                  >
                    Height
                  </Label>
                  <Input
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    id="height"
                    placeholder="Your height in meters"
                    value={height}
                    onChange={handleHeightChange}
                  />
                </div>
              </div>
              <div className="flex space-x-2 space-y-2 items-end">
                <div className="w-1/2 space-y-2">
                  <Label
                    className="text-gray-600 dark:text-gray-400 "
                    htmlFor="premium"
                  >
                    Premium
                  </Label>
                  <Select
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
                    id="premium"
                    value={premium}
                    onValueChange={setPremium}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Become our premium member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2 space-y-2">
                  <Label
                    className="text-gray-600 dark:text-gray-400 "
                    htmlFor="costperhour"
                  >
                    Cost Per Hour
                  </Label>
                  <Input
                    className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                    id="costperhour"
                    placeholder="Enter your per hour cost"
                    value={costPerHour}
                    onChange={handleCostPerHourChange}
                  />
                </div>
              </div>
              <div className="w-full space-y-2">
                <Label
                  className="text-gray-600 dark:text-gray-400 "
                  htmlFor="categories"
                >
                  Categories
                </Label>
                <ReactSelect
                  id="categories"
                  isMulti
                  options={categoryOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="w-full space-y-2">
                <Label
                  className="text-gray-600 dark:text-gray-400 "
                  htmlFor="image"
                >
                  Image
                </Label>
                <input
                  className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2 rounded-md"
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              <div className="space-y-2">
                <Label
                  className="text-gray-600 dark:text-gray-400 "
                  htmlFor="about"
                >
                  About
                </Label>
                <Textarea
                  className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2"
                  id="about"
                  placeholder="Describe yourself and tell clients how you can be the best buddy for them."
                  onChange={(e)=>setNote(e.target.value)}
                  rows="4"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose>
            <Button type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCast;
