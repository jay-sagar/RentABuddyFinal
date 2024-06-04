"use client";
import { toast } from 'sonner';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactSelect from 'react-select';

const categories = [
  { id: 1, name: 'Movie' },
  { id: 2, name: 'Food' },
  { id: 3, name: 'Travel' },
  { id: 4, name: 'Sports' },
  { id: 5, name: 'Shopping' },
  { id: 6, name: 'Gaming' },
];

const Form = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [costPerHour, setCostPerHour] = useState("");
  const [height, setHeight] = useState("");
  const [premium, setPremium] = useState("");
  const [about, setAbout] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();

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
    setSelectedCategories(selectedOptions.map(option => option.value));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      name,
      gender,
      age,
      costPerHour,
      height,
      premium,
      about,
      categories: selectedCategories,
    }));
    if (image) {
      formData.append('files.Image', image);
    }
    
    try {
      const resp = await GlobalApi.addCast(formData);
      if (resp) {
        toast("You have been added successfully");
        router.push('/success'); // Replace with your success page
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <form key="1" className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Join Our Casts And Get the Real Money!</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please fill the below form to be one of us.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="name">
            Name
          </Label>
          <Input
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-2 space-y-2 items-end">
          <div className="w-1/3 space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="gender">
              Gender
            </Label>
            <Select
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
              id="gender"
              value={gender}
              onValueChange={setGender}
              required
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
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="age">
              Age
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="age"
              placeholder="Enter your Age"
              value={age}
              onChange={handleAgeChange}
              required
            />
          </div>
          <div className="w-1/3 space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="height">
              Height
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="height"
              placeholder="Your height in meters"
              value={height}
              onChange={handleHeightChange}
              required
            />
          </div>
        </div>
        <div className="flex space-x-2 space-y-2 items-end">
          <div className="w-1/2 space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="premium">
              Premium
            </Label>
            <Select
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
              id="premium"
              value={premium}
              onValueChange={setPremium}
              required
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
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="costperhour">
              Cost Per Hour
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="costperhour"
              placeholder="Enter your per hour cost"
              value={costPerHour}
              onChange={handleCostPerHourChange}
              required
            />
          </div>
        </div>
        <div className="w-full space-y-2">
          <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="categories">
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
          <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="image">
            Image
          </Label>
          <input
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2 rounded-md"
            id="image"
            type="file"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="about">
            About
          </Label>
          <textarea
            className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2"
            id="about"
            placeholder="Describe yourself and tell clients how you can be the best buddy for them."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
            rows="4"
          />
        </div>
        <Button className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
