import React, { useState, useMemo } from "react";
import { Calendar, Tag, Search, ThumbsUp, ThumbsDown, X, Eye, ChevronRight } from "lucide-react";
import { useAppContext } from '../context/AppContext';

const categories = ["All", "League", "Teams", "Media", "Community", "Infrastructure", "Partnerships"];

// Helper to truncate text
const truncateText = (text, wordLimit = 25) => {
  if (!text) return "";
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

// Check if text exceeds word limit
const exceedsWordLimit = (text, wordLimit = 25) => {
  if (!text) return false;
  return text.split(' ').length > wordLimit;
};

export default function News() {
  const { news, likeNews, dislikeNews } = useAppContext();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [likedArticles, setLikedArticles] = useState({});
  const [dislikedArticles, setDislikedArticles] = useState({});
  const [selectedArticle, setSelectedArticle] = useState(null);

  const publishedNews = useMemo(() => {
    return news.filter(n => n.status === "PUBLISHED");
  }, [news]);

  const filteredNews = useMemo(() => {
    return publishedNews.filter((newsItem) => {
      const matchesSearch = newsItem.title.toLowerCase().includes(search.toLowerCase()) ||
                            newsItem.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                            newsItem.tag?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || newsItem.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [publishedNews, search, category]);

  const featuredNews = useMemo(() => {
    return publishedNews.find(n => n.featured);
  }, [publishedNews]);

  const regularNews = useMemo(() => {
    return filteredNews.filter(n => !n.featured);
  }, [filteredNews]);

  const handleLike = (id) => {
    if (likedArticles[id]) return;
    if (dislikedArticles[id]) {
      setDislikedArticles(prev => ({ ...prev, [id]: false }));
    }
    setLikedArticles(prev => ({ ...prev, [id]: true }));
    likeNews(id);
  };

  const handleDislike = (id) => {
    if (dislikedArticles[id]) return;
    if (likedArticles[id]) {
      setLikedArticles(prev => ({ ...prev, [id]: false }));
    }
    setDislikedArticles(prev => ({ ...prev, [id]: true }));
    dislikeNews(id);
  };

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden';
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset';
  };

  // Render excerpt with "Read more" button if needed
  const renderExcerpt = (article) => {
    const wordLimit = 20;
    const text = article.excerpt || "";
    const needsMore = exceedsWordLimit(text, wordLimit);
    
    if (!needsMore) {
      return <p className="text-sm text-lbl-soft-light">{text}</p>;
    }
    
    return (
      <p className="text-sm text-lbl-soft-light">
        {truncateText(text, wordLimit)}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            openArticleModal(article);
          }}
          className="text-lbl-orange hover:underline ml-1 font-medium inline-flex items-center gap-0.5"
        >
          Read more <ChevronRight size={14} className="inline" />
        </button>
      </p>
    );
  };

  return (
    <div>
      <h1 className="font-bebas text-4xl tracking-wide mb-2">NEWS</h1>
      <p className="text-lbl-soft text-sm mb-8 max-w-xl">
        Stay up to date with the latest developments from the Littoral Basketball League.
      </p>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-lbl-soft-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search news..."
            className="w-full bg-white border border-lbl-soft/20 rounded-lg pl-9 pr-3 py-2 text-sm text-lbl-dark placeholder:text-lbl-soft-light focus:outline-none focus:border-lbl-orange/40"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-lbl-orange text-lbl-cream"
                  : "bg-white border border-lbl-soft/20 text-lbl-soft hover:border-lbl-orange"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-lbl-soft-light ml-2">
          {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      {/* Featured Article */}
      {featuredNews && (
        <div className="bg-white rounded-2xl border border-lbl-soft/10 overflow-hidden shadow-sm mb-8 hover:border-lbl-orange/30 transition-colors">
          {featuredNews.image && (
            <div className="w-full h-56 md:h-64 bg-lbl-cream overflow-hidden">
              <img 
                src={featuredNews.image} 
                alt={featuredNews.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-jetbrains text-[#c73b2b] font-bold">{featuredNews.tag}</span>
              <span className="text-[10px] font-jetbrains px-2 py-0.5 rounded-full bg-[#E8A93D]/10 text-[#E8A93D]">★ Featured</span>
              <span className="text-[10px] text-lbl-soft-light">{featuredNews.category}</span>
            </div>
            <h2 className="font-bebas text-3xl mt-2 mb-3">{featuredNews.title}</h2>
            <div className="text-lbl-soft text-sm leading-relaxed max-w-2xl mb-4">
              {featuredNews.excerpt && exceedsWordLimit(featuredNews.excerpt, 30) ? (
                <>
                  {truncateText(featuredNews.excerpt, 30)}
                  <button 
                    onClick={() => openArticleModal(featuredNews)}
                    className="text-lbl-orange hover:underline ml-1 font-medium"
                  >
                    Read more
                  </button>
                </>
              ) : (
                featuredNews.excerpt
              )}
            </div>
            <div className="flex items-center gap-6 text-xs text-lbl-soft-light">
              <span className="flex items-center gap-1"><Calendar size={12} /> {featuredNews.date || "Coming soon"}</span>
              <span className="flex items-center gap-1"><Tag size={12} /> {featuredNews.category}</span>
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-lbl-soft/10">
              <button
                onClick={() => handleLike(featuredNews.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  likedArticles[featuredNews.id] 
                    ? "text-lbl-orange" 
                    : "text-lbl-soft-light hover:text-lbl-orange"
                }`}
              >
                <ThumbsUp size={16} />
                <span>{featuredNews.likes || 0}</span>
              </button>
              <button
                onClick={() => handleDislike(featuredNews.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  dislikedArticles[featuredNews.id] 
                    ? "text-[#C8102E]" 
                    : "text-lbl-soft-light hover:text-[#C8102E]"
                }`}
              >
                <ThumbsDown size={16} />
                <span>{featuredNews.dislikes || 0}</span>
              </button>
              <button
                onClick={() => openArticleModal(featuredNews)}
                className="flex items-center gap-1 text-sm text-lbl-soft-light hover:text-lbl-orange transition-colors ml-auto"
              >
                <Eye size={14} /> Read full article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Grid - Fixed Height Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {regularNews.map((newsItem) => (
          <div 
            key={newsItem.id} 
            className="bg-white rounded-2xl border border-lbl-soft/10 overflow-hidden shadow-sm hover:border-lbl-orange/30 transition-all group flex flex-col h-[380px]"
            onClick={() => {
              if (exceedsWordLimit(newsItem.excerpt || "", 20)) {
                openArticleModal(newsItem);
              }
            }}
          >
            {/* Image Section - Fixed Height with object-fit cover */}
            <div className="h-44 bg-lbl-cream overflow-hidden shrink-0">
              {newsItem.image ? (
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-lbl-cream to-lbl-cream-dark flex items-center justify-center">
                  <span className="text-lbl-soft-light/30 font-bebas text-4xl">LBL</span>
                </div>
              )}
            </div>
            
            {/* Content Section - Fixed Height with Flex */}
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-jetbrains text-lbl-orange font-bold">{newsItem.tag}</span>
                <span className="text-[10px] text-lbl-soft-light">{newsItem.category}</span>
              </div>
              <h3 className="font-semibold text-base mb-2 group-hover:text-lbl-orange transition-colors line-clamp-2">
                {newsItem.title}
              </h3>
              
              {/* Excerpt with inline Read More button */}
              <div className="text-sm text-lbl-soft-light flex-1 overflow-hidden">
                {renderExcerpt(newsItem)}
              </div>
              
              {/* Footer - Date and Category */}
              <div className="flex items-center justify-between text-xs text-lbl-soft-light mt-2 pt-2 border-t border-lbl-soft/10">
                <span className="flex items-center gap-1"><Calendar size={12} /> {newsItem.date || "Coming soon"}</span>
                <span className="flex items-center gap-1"><Tag size={12} /> {newsItem.category}</span>
              </div>
              
              {/* Likes/Dislikes */}
              <div className="flex items-center gap-3 mt-2 pt-2 border-t border-lbl-soft/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(newsItem.id);
                  }}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    likedArticles[newsItem.id] 
                      ? "text-lbl-orange" 
                      : "text-lbl-soft-light hover:text-lbl-orange"
                  }`}
                >
                  <ThumbsUp size={14} />
                  <span>{newsItem.likes || 0}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDislike(newsItem.id);
                  }}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    dislikedArticles[newsItem.id] 
                      ? "text-[#C8102E]" 
                      : "text-lbl-soft-light hover:text-[#C8102E]"
                  }`}
                >
                  <ThumbsDown size={14} />
                  <span>{newsItem.dislikes || 0}</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openArticleModal(newsItem);
                  }}
                  className="flex items-center gap-1 text-xs text-lbl-soft-light hover:text-lbl-orange transition-colors ml-auto"
                >
                  <Eye size={12} /> 
                  {exceedsWordLimit(newsItem.excerpt || "", 20) ? 'Full article' : 'View'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-2xl border border-lbl-soft/10 p-8 text-center text-lbl-soft-light shadow-sm">
          {publishedNews.length === 0 
            ? "No news articles available yet. Check back soon!"
            : "No news matches your search criteria."}
        </div>
      )}

      {/* Article Modal - 70/30 Layout */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeArticleModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-lbl-soft/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-lbl-soft/10 flex items-start justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-jetbrains text-[#c73b2b] font-bold">{selectedArticle.tag}</span>
                  {selectedArticle.featured && (
                    <span className="text-[10px] font-jetbrains px-2 py-0.5 rounded-full bg-[#E8A93D]/10 text-[#E8A93D]">★ Featured</span>
                  )}
                  <span className="text-[10px] text-lbl-soft-light">{selectedArticle.category}</span>
                </div>
                <h2 className="font-bebas text-2xl md:text-3xl tracking-wide">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-xs text-lbl-soft-light mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {selectedArticle.date || "Coming soon"}</span>
                  <span className="flex items-center gap-1"><Tag size={12} /> {selectedArticle.category}</span>
                </div>
              </div>
              <button
                onClick={closeArticleModal}
                className="p-1.5 rounded-full hover:bg-lbl-soft/10 transition-colors text-lbl-soft-light hover:text-lbl-soft"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Body - 70/30 Layout for Image/Text */}
            <div className="flex-1 overflow-y-auto">
              {selectedArticle.image ? (
                <div className="flex flex-col md:flex-row h-full">
                  {/* Image - 30% on desktop */}
                  <div className="md:w-2/5 lg:w-1/3 bg-lbl-cream overflow-hidden shrink-0">
                    <img 
                      src={selectedArticle.image} 
                      alt={selectedArticle.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  {/* Text - 70% on desktop */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-lbl-dark text-base leading-relaxed whitespace-pre-wrap">
                        {selectedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // No image - full width text
                <div className="p-6">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lbl-dark text-base leading-relaxed whitespace-pre-wrap">
                      {selectedArticle.excerpt}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with likes/dislikes */}
            <div className="p-4 border-t border-lbl-soft/10 bg-lbl-cream/30 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(selectedArticle.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      likedArticles[selectedArticle.id] 
                        ? "text-lbl-orange" 
                        : "text-lbl-soft-light hover:text-lbl-orange"
                    }`}
                  >
                    <ThumbsUp size={16} />
                    <span>{selectedArticle.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(selectedArticle.id)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      dislikedArticles[selectedArticle.id] 
                        ? "text-[#C8102E]" 
                        : "text-lbl-soft-light hover:text-[#C8102E]"
                    }`}
                  >
                    <ThumbsDown size={16} />
                    <span>{selectedArticle.dislikes || 0}</span>
                  </button>
                </div>
                <span className="text-xs text-lbl-soft-light">
                  {selectedArticle.excerpt?.split(' ').length || 0} words
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}