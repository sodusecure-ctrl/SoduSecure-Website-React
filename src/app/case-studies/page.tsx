"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Calendar, Clock, Filter, Search, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { blogPosts } from '@/lib/blogData';

export default function CaseStudiesPage() {
  const t = useTranslations('caseStudies');
  const [activeTab, setActiveTab] = useState<'cases' | 'blogs'>('blogs');
  const [searchQuery, setSearchQuery] = useState('');

  // Generate JSON-LD for Blog List
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'sodusecure Security Blog',
    description: 'Cybersecurity insights, penetration testing guides, and security best practices',
    url: 'https://sodusecure.com/case-studies',
    blogPost: blogPosts.map(blog => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      image: `https://sodusecure.com${blog.image}`,
      datePublished: blog.date,
      author: {
        '@type': 'Person',
        name: blog.author,
      },
      url: `https://sodusecure.com/case-studies/blogs/${blog.slug}`,
    })),
  };
  const [selectedBlogCategory, setSelectedBlogCategory] = useState('All');
  const [selectedCaseCategory, setSelectedCaseCategory] = useState('All');

  // Create case studies data from translations
  const caseStudies = [
    {
      id: 1,
      image: "/images/case/image1.png",
      category: t('caseStudies.items.0.category'),
      title: t('caseStudies.items.0.title'),
      description: t('caseStudies.items.0.description'),
      tag: t('caseStudies.items.0.tag'),
      categoryColor: "text-red-500",
      date: "Dec 2024"
    },
    {
      id: 2,
      image: "/images/case/image2.png",
      category: t('caseStudies.items.1.category'),
      title: t('caseStudies.items.1.title'),
      description: t('caseStudies.items.1.description'),
      tag: t('caseStudies.items.1.tag'),
      categoryColor: "text-pink-500",
      date: "Nov 2024"
    },
    {
      id: 3,
      image: "/images/case/image3.png",
      category: t('caseStudies.items.2.category'),
      title: t('caseStudies.items.2.title'),
      description: t('caseStudies.items.2.description'),
      tag: t('caseStudies.items.2.tag'),
      categoryColor: "text-orange-500",
      date: "Nov 2024"
    },
    {
      id: 4,
      image: "/images/case/image4.png",
      category: t('caseStudies.items.3.category'),
      title: t('caseStudies.items.3.title'),
      description: t('caseStudies.items.3.description'),
      tag: t('caseStudies.items.3.tag'),
      categoryColor: "text-blue-500",
      date: "Oct 2024"
    },
    {
      id: 5,
      image: "/images/case/image5.png",
      category: t('caseStudies.items.4.category'),
      title: t('caseStudies.items.4.title'),
      description: t('caseStudies.items.4.description'),
      tag: t('caseStudies.items.4.tag'),
      categoryColor: "text-purple-500",
      date: "Oct 2024"
    },
    {
      id: 6,
      image: "/images/case/image6.png",
      category: t('caseStudies.items.5.category'),
      title: t('caseStudies.items.5.title'),
      description: t('caseStudies.items.5.description'),
      tag: t('caseStudies.items.5.tag'),
      categoryColor: "text-green-500",
      date: "Sep 2024"
    }
  ];

  // Create blogs data from translations
  const blogs = [
    {
      id: 1,
      image: "/images/blogs/image1.png",
      category: t('blogs.items.0.category'),
      title: t('blogs.items.0.title'),
      description: t('blogs.items.0.description'),
      author: t('blogs.items.0.author'),
      date: "Dec 1, 2024",
      readTime: t('blogs.items.0.readTime'),
      categoryColor: "text-red-500"
    },
    {
      id: 2,
      image: "/images/blogs/image2.png",
      category: t('blogs.items.1.category'),
      title: t('blogs.items.1.title'),
      description: t('blogs.items.1.description'),
      author: t('blogs.items.1.author'),
      date: "Nov 28, 2024",
      readTime: t('blogs.items.1.readTime'),
      categoryColor: "text-yellow-500"
    },
    {
      id: 3,
      image: "/images/blogs/image3.png",
      category: t('blogs.items.2.category'),
      title: t('blogs.items.2.title'),
      description: t('blogs.items.2.description'),
      author: t('blogs.items.2.author'),
      date: "Nov 25, 2024",
      readTime: t('blogs.items.2.readTime'),
      categoryColor: "text-pink-500"
    },
    {
      id: 4,
      image: "/images/blogs/image4.png",
      category: t('blogs.items.3.category'),
      title: t('blogs.items.3.title'),
      description: t('blogs.items.3.description'),
      author: t('blogs.items.3.author'),
      date: "Nov 22, 2024",
      readTime: t('blogs.items.3.readTime'),
      categoryColor: "text-blue-500"
    },
    {
      id: 5,
      image: "/images/blogs/image5.png",
      category: t('blogs.items.4.category'),
      title: t('blogs.items.4.title'),
      description: t('blogs.items.4.description'),
      author: t('blogs.items.4.author'),
      date: "Nov 18, 2024",
      readTime: t('blogs.items.4.readTime'),
      categoryColor: "text-yellow-500"
    },
    {
      id: 6,
      image: "/images/blogs/image6.png",
      category: t('blogs.items.5.category'),
      title: t('blogs.items.5.title'),
      description: t('blogs.items.5.description'),
      author: t('blogs.items.5.author'),
      date: "Nov 15, 2024",
      readTime: t('blogs.items.5.readTime'),
      categoryColor: "text-red-500"
    },
    {
      id: 7,
      image: "/images/blogs/image7.png",
      category: t('blogs.items.6.category'),
      title: t('blogs.items.6.title'),
      description: t('blogs.items.6.description'),
      author: t('blogs.items.6.author'),
      date: "Jan 15, 2025",
      readTime: t('blogs.items.6.readTime'),
      categoryColor: "text-cyan-500"
    },
    {
      id: 8,
      image: "/images/blogs/image8.png",
      category: t('blogs.items.7.category'),
      title: t('blogs.items.7.title'),
      description: t('blogs.items.7.description'),
      author: t('blogs.items.7.author'),
      date: "Jan 10, 2025",
      readTime: t('blogs.items.7.readTime'),
      categoryColor: "text-purple-500"
    },
    {
      id: 9,
      image: "/images/blogs/image9.png",
      category: t('blogs.items.8.category'),
      title: t('blogs.items.8.title'),
      description: t('blogs.items.8.description'),
      author: t('blogs.items.8.author'),
      date: "Jan 5, 2025",
      readTime: t('blogs.items.8.readTime'),
      categoryColor: "text-orange-500"
    },
    {
      id: 10,
      image: "/images/blogs/image10.png",
      category: t('blogs.items.9.category'),
      title: t('blogs.items.9.title'),
      description: t('blogs.items.9.description'),
      author: t('blogs.items.9.author'),
      date: "Jan 30, 2026",
      readTime: t('blogs.items.9.readTime'),
      categoryColor: "text-emerald-500"
    },
    {
      id: 11,
      image: "/images/blogs/image1.png",
      category: t('blogs.items.10.category'),
      title: t('blogs.items.10.title'),
      description: t('blogs.items.10.description'),
      author: t('blogs.items.10.author'),
      date: "Feb 2, 2026",
      readTime: t('blogs.items.10.readTime'),
      categoryColor: "text-blue-600"
    },
    {
      id: 12,
      image: "/images/blogs/dsgvo-image-blog-pentest.jpg",
      category: t('blogs.items.11.category'),
      title: t('blogs.items.11.title'),
      description: t('blogs.items.11.description'),
      author: t('blogs.items.11.author'),
      date: "Feb 11, 2026",
      readTime: t('blogs.items.11.readTime'),
      categoryColor: "text-red-500"
    }
  ].reverse();

  const blogCategories = [t('blogs.categories.0'), t('blogs.categories.1'), t('blogs.categories.2'), t('blogs.categories.3'), t('blogs.categories.4')];
  const caseCategories = [t('caseStudies.categories.0'), t('caseStudies.categories.1'), t('caseStudies.categories.2'), t('caseStudies.categories.3'), t('caseStudies.categories.4'), t('caseStudies.categories.5'), t('caseStudies.categories.6')];

  // Filter blogs function
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Handle category filtering
    let matchesCategory = true;
    if (selectedBlogCategory !== 'All') {
      // Convert selected category to match blog category format
      const selectedCategoryNormalized = selectedBlogCategory.toLowerCase().replace(' ', '_');
      const blogCategoryNormalized = blog.category.toLowerCase();
      matchesCategory = blogCategoryNormalized === selectedCategoryNormalized;
    }

    return matchesSearch && matchesCategory;
  });

  // Filter case studies function - FIXED VERSION
  const filteredCaseStudies = caseStudies.filter(study => {
    // Search filter
    const matchesSearch = study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    let matchesCategory = true;
    if (selectedCaseCategory !== 'All') {
      // Normalize the category comparison
      const selectedCategoryNormalized = selectedCaseCategory.toLowerCase();
      const studyCategoryNormalized = study.category.toLowerCase();

      // Handle special cases
      if (selectedCategoryNormalized === 'e-commerce') {
        matchesCategory = studyCategoryNormalized === 'e-commerce';
      } else {
        matchesCategory = studyCategoryNormalized.includes(selectedCategoryNormalized);
      }
    }

    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (type: string, id: number) => {
    if (type === 'case') {
      window.location.href = `/case-studies/study/${id}`;
    } else {
      window.location.href = `/case-studies/blogs/${id}`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* JSON-LD for Blog List */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      
      {/* Hero Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <Badge variant="outline" className="border-red-500 text-red-500 mb-3 sm:mb-4 text-xs sm:text-sm">
            {t('hero.badge')}
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8">
            {t('hero.description')}
          </p>

          {/* Tab Buttons - Responsive layout */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={() => setActiveTab('blogs')}
              className={`py-4 sm:py-6 sm:w-6/12 text-sm sm:text-base lg:text-lg font-semibold ${activeTab === 'blogs'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-800 hover:bg-gray-700'
                }`}
            >
              {t('hero.securityBlogsTab')}
            </Button>
            <Button
              onClick={() => setActiveTab('cases')}
              className={`py-4 sm:py-6 sm:w-6/12 text-sm sm:text-base lg:text-lg font-semibold ${activeTab === 'cases'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-800 hover:bg-gray-700'
                }`}
            >
              {t('hero.caseStudiesTab')}
            </Button>
          </div>
        </div>
      </div>

      {/* Case Studies View */}
      {activeTab === 'cases' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          {/* Search Bar for Mobile */}
          <div className="mb-6 sm:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder={t('hero.searchPlaceholder')}
                className="bg-gray-900 border-gray-800 pl-9 py-3 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-400">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Filter case studies</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
              {caseCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCaseCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap text-xs sm:text-sm ${selectedCaseCategory === category
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-transparent border-gray-100 hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedCaseCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              Showing {filteredCaseStudies.length} of {caseStudies.length} case studies
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCaseStudies.map((study) => (
              <Card
                key={study.id}
                className="bg-gray-900 p-0 border-gray-800 overflow-hidden text-white hover:border-gray-700 transition-colors group cursor-pointer"
                onClick={() => handleReadMore('case', study.id)}
              >
                <div className="relative">
                  <div className="aspect-video overflow-hidden bg-gray-800">
                    <Image
                      src={study.image}
                      alt={study.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className={`absolute top-3 left-3  text-white ${study.categoryColor} border-current text-xs font-medium`}
                  >
                    {study.category}
                  </Badge>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white">{study.tag}</span>
                    <span className="text-xs text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {study.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl text-white font-bold mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {study.title}
                  </h3>
                  <p className=" text-white text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                    {study.description}
                  </p>

                  <Button
                    variant="link"
                    className="text-red-500 hover:text-red-400 p-0 text-sm sm:text-base group/btn w-fit"
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      {t('hero.readMore')}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredCaseStudies.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No case studies found</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}

      {/* Blogs View */}
      {activeTab === 'blogs' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder={t('hero.searchBlogsPlaceholder')}
                className="bg-gray-900 border-gray-800 pl-9 sm:pl-10 py-3 sm:py-4 text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-3 overflow-x-auto pb-2">
              {blogCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedBlogCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap text-xs text-white sm:text-sm ${selectedBlogCategory === category
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-transparent border-gray-100 hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedBlogCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
              {filteredBlogs.length} articles found
            </p>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="bg-gray-900 p-0 border-gray-800 text-white overflow-hidden hover:border-gray-700 transition-colors group cursor-pointer"
                onClick={() => handleReadMore('blog', blog.id)}
              >
                <div className="relative">
                  <div className="aspect-video overflow-hidden bg-gray-800">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge
                    variant="outline"
                    className={`absolute top-3 left-3 ${blog.categoryColor} text-white border-current text-xs font-medium`}
                  >
                    {blog.category}
                  </Badge>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className=" text-xs sm:text-sm mb-4 text-white leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-col sm:flex-row sm:items-center text-white justify-between gap-2 sm:gap-4 mb-4 pt-3 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-xs text-white">
                      <User className="w-3.5 h-3.5" />
                      <span className="truncate">{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="link"
                    className="text-red-500 hover:text-red-400 p-0 text-sm sm:text-base group/btn w-fit"
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2">
                      {t('hero.readMore')}
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Search className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Try adjusting your search or selecting a different category
              </p>
            </div>
          )}

          {/* Newsletter Subscription - Only on desktop */}
          <div className="hidden lg:block mt-12 sm:mt-16">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 sm:p-8">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Stay Updated</h3>
                <p className="text-gray-400 text-sm sm:text-base mb-6">
                  Subscribe to our newsletter for the latest security insights and articles.
                </p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-gray-800 border-gray-700 flex-1"
                  />
                  <Button className="bg-red-600 hover:bg-red-700">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Newsletter */}
      <div className="lg:hidden bg-gray-900 border-t border-gray-800 px-4 py-6 sm:px-6">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2">Get Security Updates</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for the latest security insights
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Your email"
              className="bg-gray-800 border-gray-700 text-sm"
            />
            <Button className="bg-red-600 hover:bg-red-700 text-sm">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
